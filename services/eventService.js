const mongoose = require('mongoose')
const Event = require('../models/event')
const User = require('../models/user')
const userService = require('./userService')
const validators = require('../utils/validators')

exports.populate = async (event) => {

    const populatedEvent = await event
        .populate('guests.user', { _id: 1, name: 1, avatar: 1 })
        .execPopulate()

    populatedEvent.components.sort((a, b) =>
        a.position - b.position
    )

    populatedEvent.components.forEach(component => {
        if (component.type === 'INVITE_LINK') {
            component.data = {}
            component.data.inviteKey = populatedEvent.inviteKey
        }
    })

    const getUser = async userId => {
        if (userId === null) {
            return null
        }
        const guest = populatedEvent.guests.find(guest => guest.user._id.toString() === userId.toString())
        return guest ? guest.user : await User.findById(userId, { _id: 1, name: 1, avatar: 1 })
    }

    populatedEvent.creator = await getUser(populatedEvent.creator)

    const discussionPromises = populatedEvent.discussion.map(async message => {
        message.author = await getUser(message.author)
        if (message.author === null) {
            message.content = null
        }
        const commentPromises = message.comments.map(async comment => {
            comment.author = await getUser(comment.author)
            if (comment.author === null) {
                comment.content = null
            }
            return comment
        })

        message.comments = await Promise.all(commentPromises)
        return message
    })

    populatedEvent.discussion = await Promise.all(discussionPromises)

    return populatedEvent
}

exports.create = async (creatorId, eventObject) => {
    const startDate = eventObject.startDate ? new Date(eventObject.startDate) : new Date()
    const endDate = eventObject.endDate ? new Date(eventObject.endDate) : new Date(startDate.getTime() + 1000 * 60 * 60 * 24)

    if (!validators.validateDates(startDate, endDate)) {
        throw new Error('End Date must be greater than Start Date')
    }

    const newEvent = new Event({
        label: eventObject.label,
        startDate: startDate,
        endDate: endDate,
        creator: creatorId,
        background: eventObject.background,
        guests: [{
            user: creatorId,
            status: 'GOING'
        }]
    })

    const error = newEvent.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    await Event.createCollection()
    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        await userService.addToMyEvents(creatorId, newEvent._id, options)

        const savedEvent = await newEvent.save(options)

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not create event')
    }
}

exports.update = async (event, eventObject) => {
    const startDate = new Date(eventObject.startDate)
    const endDate = new Date(eventObject.endDate)

    if (!validators.validateDates(startDate, endDate)) {
        throw new Error('End Date must be greater than Start Date')
    }

    if (!validators.validateComponents(eventObject.components)) {
        throw new Error('Components are not valid')
    }

    const componentPromises = []

    // Remove components
    event.components.map(eventComponent => {
        const removed = !eventObject.components.some(component => component._id === eventComponent._id.toString())

        if (removed) {
            const componentPromise = this.removeComponent(event._id, eventComponent._id)
            componentPromises.push(componentPromise)
        }
    })

    // Update or Create components
    eventObject.components.map((component, position) => {
        if (component._id) {
            const type = event.components.find(c => c._id.toString() === component._id).type
            componentPromise = this.updateComponent(event._id, component._id, type, component.data, position)
        } else {
            componentPromise = this.createComponent(event._id, component.type, component.data, position)
        }
        componentPromises.push(componentPromise)
    })

    // Wait for all component update promises to resolve
    await Promise.all(componentPromises)

    const updateObject = {
        label: eventObject.label,
        startDate: startDate,
        endDate: endDate,
        background: eventObject.background
    }

    const savedEvent = await Event.findByIdAndUpdate(event._id, updateObject, { new: true, runValidators: true })

    const populatedEvent = await this.populate(savedEvent)

    return populatedEvent
}

exports.delete = async (event) => {
    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        await Event.findByIdAndDelete(event._id, options)

        await userService.removeFromMyEvents(event.creator._id, event._id, options)

        for (guest of event.guests) {
            await userService.removeFromMyInvites(guest.user, event._id, options)
        }

        await session.commitTransaction()
        session.endSession()

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not remove event')
    }
}

exports.addGuest = async (event, guestId) => {
    const guest = event.guests.find(guest => guest.user.toString() === guestId)

    if (guest) {
        throw new Error('User is already a guest')
    }

    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        await userService.addToMyInvites(guestId, event._id, options)

        const savedEvent = await this.addToGuests(event._id, guestId, options)

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not add guest')
    }
}

exports.removeGuest = async (event, guestId) => {

    if (event.creator.toString() === guestId) {
        throw new Error('Creator can not be removed')
    }

    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        await userService.removeFromMyInvites(guestId, event._id, options)

        const savedEvent = await this.removeFromGuests(event._id, guestId, options)

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not remove guest')
    }
}

exports.changeInviteKey = async (event) => {
    const updateObject = {
        inviteKey: mongoose.Types.ObjectId().toHexString()
    }

    const savedEvent = await Event.findByIdAndUpdate(event._id, updateObject, { new: true })

    return await this.populate(savedEvent)
}

exports.setStatus = async (event, guestId, status) => {
    const savedEvent = await Event.findOneAndUpdate(
        { _id: event._id, 'guests.user': guestId },
        { $set: { 'guests.$.status': status } },
        { new: true, runValidators: true })

    return await this.populate(savedEvent)
}

exports.addMessage = async (event, author, message) => {
    if (!message || !author) {
        throw new Error('Message and author required')
    }

    const newMessage = {
        content: message,
        author: author
    }

    const savedEvent = await Event.findByIdAndUpdate(
        event._id,
        { $push: { discussion: { $each: [newMessage], $position: 0 } } },
        { new: true, runValidators: true })

    return await this.populate(savedEvent)
}

exports.addComment = async (event, author, messageId, comment) => {
    if (!comment || !author) {
        throw new Error('Comment and author required')
    }

    const newComment = {
        content: comment,
        author: author
    }

    const savedEvent = await Event.findOneAndUpdate(
        { _id: event._id, 'discussion._id': messageId },
        { $push: { 'discussion.$.comments': newComment } },
        { new: true, runValidators: true })

    return await this.populate(savedEvent)
}

exports.removeMessage = async (event, messageId) => {
    const savedEvent = await Event.findOneAndUpdate(
        { _id: event._id, 'discussion._id': messageId },
        { $set: { 'discussion.$.author': null, 'discussion.$.content': null } },
        { new: true })

    return await this.populate(savedEvent)
}

exports.removeComment = async (event, messageId, commentId) => {
    const savedEvent = await Event.findOneAndUpdate(
        { _id: event._id, 'discussion._id': messageId },
        { $set: { 'discussion.$.comments.$[comment].author': null, 'discussion.$.comments.$[comment].content': null } },
        { arrayFilters: [{ 'comment._id': commentId }], new: true })

    return await this.populate(savedEvent)
}

exports.addToGuests = async (id, userId, options = {}) => {
    const guest = {
        user: userId,
        status: 'PENDING'
    }

    options.new = true

    return await Event.findByIdAndUpdate(id, { $addToSet: { guests: guest } }, options)
}

exports.removeFromGuests = async (id, userId, options = {}) => {
    options.new = true

    return await Event.findByIdAndUpdate(id, { $pull: { guests: { user: userId } } }, options)
}

exports.createComponent = async (id, type, data, position, options = {}) => {
    options.new = true
    options.runValidators = true

    const component = {
        type,
        data,
        position
    }

    return await Event.findByIdAndUpdate(id, { $addToSet: { components: component } }, options)
}

exports.updateComponent = async (id, componentId, type, data, position, options = {}) => {
    options.new = true
    options.runValidators = true

    switch (type) {
        case 'TEXT':
            return await this.updateTextComponent(id, componentId, data, position, options)
        case 'PICTURE':
            return await this.updatePictureComponent(id, componentId, data, position, options)
        case 'INVITE_LINK':
            return await this.updateInviteLinkComponent(id, componentId, position, options)
        case 'VOTE':
            return await this.updateVoteComponent(id, componentId, data, position, options)
        default:
            throw new Error(type + ' is not a valid component type')
    }
}

exports.updateTextComponent = async (id, componentId, data, position, options = {}) => {
    if (!validators.validateTextData(data)) {
        throw new Error('Data for component type TEXT is not valid')
    }
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId },
        { $set: { 'components.$.data.title': data.title, 'components.$.data.content': data.content, 'components.$.position': position } },
        options)
}

exports.updatePictureComponent = async (id, componentId, data, position, options = {}) => {
    if (!validators.validatePictureData(data)) {
        throw new Error('Data for component type PICTURE is not valid')
    }
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId },
        { $set: { 'components.$.data.url': data.url, 'components.$.data.expand': data.expand, 'components.$.position': position } },
        options)
}

exports.updateInviteLinkComponent = async (id, componentId, position, options = {}) => {
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId },
        { $set: { 'components.$.position': position } },
        options)
}

exports.updateVoteComponent = async (id, componentId, data, position, options = {}) => {
    if (!validators.validateVoteData(data)) {
        throw new Error('Data for component type VOTE is not valid')
    }

    const updatePromises = data.options.map(option => {
        if (option._id) {
            return this.updateOptionInVoteComponent(id, componentId, option._id, option.label, options)
        } else {
            return this.addOptionToVoteComponent(id, componentId, option.label, options)
        }
    })

    await Promise.all(updatePromises)

    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId },
        { $set: { 'components.$.data.subject': data.subject, 'components.$.position': position } },
        options)
}

exports.updateOptionInVoteComponent = async (id, componentId, optionId, label, options = {}) => {
    if (!validators.validateVoteOptionLabel(label)) {
        throw new Error('Label of component option not valid')
    }
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId,  },
        { $set: { 'components.$.data.options.$[option].label': label} },
        { arrayFilters: [{ 'option._id': optionId }] },
        options)
}

exports.addOptionToVoteComponent = async (id, componentId, label, options = {}) => {
    if (!validators.validateVoteOptionLabel(label)) {
        throw new Error('Label of component option not valid')
    }
    const option = {
        _id: mongoose.Types.ObjectId(),
        label: label,
        votes: []
    }
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId,  },
        { $addToSet: { 'components.$.data.options': option} },
        options)
}

exports.removeComponent = async (id, componentId, options = {}) => {
    options.new = true

    return await Event.findByIdAndUpdate(id, { $pull: { components: { _id: componentId } } }, options)
}