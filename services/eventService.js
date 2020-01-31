const mongoose = require('mongoose')
const Event = require('../models/event')
const User = require('../models/user')
const userService = require('./userService')
const validators = require('../utils/validators')

exports.populate = async (event) => {

    const populatedEvent = await event
        .populate('guests.user', { _id: 1, name: 1, avatar: 1 })
        .populate('registrations.user', { _id: 1, name: 1, avatar: 1 })
        .execPopulate()

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

    populatedEvent.components.sort((a, b) =>
        a.position - b.position
    )

    for (let component of populatedEvent.components) {
        if (component.type === 'FORM') {
            const questionPromises = component.data.questions.map(async question => {
                const answerPromises = question.answers.map(async answer => {
                    answer.user = await getUser(answer.user)
                    return answer
                })
                question.answers = await Promise.all(answerPromises)
                return question
            })
            component.data.questions = await Promise.all(questionPromises)
        } else if (component.type === 'VOTE') {
            const optionPromises = component.data.options.map(async option => {
                const votePromises = option.votes.map(async vote => await getUser(vote))
                option.votes = await Promise.all(votePromises)
                return option
            })
            component.data.options = await Promise.all(optionPromises)
        }
    }

    return populatedEvent
}

exports.create = async (creatorId, eventObject) => {
    const startDate = eventObject.startDate ? new Date(eventObject.startDate) : new Date()
    const endDate = eventObject.endDate ? new Date(eventObject.endDate) : new Date(startDate.getTime() + 1000 * 60 * 60 * 24)

    if (!validators.validateDates(startDate, endDate)) {
        throw new Error('End Date must be greater than Start Date')
    }

    if (!validators.validateRegistrationQuestions(eventObject.registrationQuestions)) {
        throw new Error('RegistrationQuestions are not valid')
    }

    const newEvent = new Event({
        label: eventObject.label,
        description: eventObject.description,
        startDate: startDate,
        endDate: endDate,
        creator: creatorId,
        background: eventObject.background,
        guests: [{
            user: creatorId,
            status: 'GOING'
        }],
        registrationQuestions: eventObject.registrationQuestions
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

    if (!validators.validateRegistrationQuestions(eventObject.registrationQuestions)) {
        throw new Error('RegistrationQuestions are not valid')
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
            const eventComponent = event.components.find(c => c._id.toString() === component._id)
            if (!eventComponent) {
                throw new Error('There is no component with id ' + component._id)
            }
            componentPromise = this.updateComponent(event, component._id, eventComponent.type, component.data, position)
        } else {
            componentPromise = this.createComponent(event._id, component.type, component.data, position)
        }
        componentPromises.push(componentPromise)
    })

    // Wait for all component update promises to resolve
    await Promise.all(componentPromises)

    const updateObject = {
        label: eventObject.label,
        description: eventObject.description,
        startDate: startDate,
        endDate: endDate,
        background: eventObject.background,
        registrationQuestions: eventObject.registrationQuestions
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

    switch (type) {
        case 'TEXT':
            return await this.createTextComponent(id, data, position, options)
        case 'PICTURE':
            return await this.createPictureComponent(id, data, position, options)
        case 'VOTE':
            return await this.createVoteComponent(id, data, position, options)
        case 'FORM':
            return await this.createFormComponent(id, data, position, options)
        default:
            throw new Error(type + ' is not a valid component type')
    }
}

exports.createTextComponent = async (id, data, position, options = {}) => {
    if (!validators.validateTextData(data)) {
        throw new Error('Data for component type TEXT is not valid')
    }
    const component = {
        type: 'TEXT',
        data: {
            title: data.title,
            content: data.content
        },
        position
    }

    return await Event.findByIdAndUpdate(id, { $addToSet: { components: component } }, options)
}

exports.createPictureComponent = async (id, data, position, options = {}) => {
    if (!validators.validatePictureData(data)) {
        throw new Error('Data for component type PICTURE is not valid')
    }
    const component = {
        type: 'PICTURE',
        data: {
            url: data.url,
            expand: data.expand
        },
        position
    }

    return await Event.findByIdAndUpdate(id, { $addToSet: { components: component } }, options)
}

exports.createVoteComponent = async (id, data, position, options = {}) => {
    const voteOptions = data.options.map(option => ({
        _id: mongoose.Types.ObjectId(),
        label: option.label,
        votes: []
    }))

    if (!validators.validateVoteData(data) || !validators.validateVoteOptions(voteOptions)) {
        throw new Error('Data for component type VOTE is not valid')
    }
    const component = {
        type: 'VOTE',
        data: {
            subject: data.subject,
            options: voteOptions
        },
        position
    }

    return await Event.findByIdAndUpdate(id, { $addToSet: { components: component } }, options)
}

exports.createFormComponent = async (id, data, position, options = {}) => {
    const formQuestions = data.questions.map(question => ({
        _id: mongoose.Types.ObjectId(),
        label: question.label,
        answers: []
    }))

    if (!validators.validateFormData(data) || !validators.validateFormQuestions(formQuestions)) {
        throw new Error('Data for component type FORM is not valid')
    }
    const component = {
        type: 'FORM',
        data: {
            questions: formQuestions
        },
        position
    }

    return await Event.findByIdAndUpdate(id, { $addToSet: { components: component } }, options)
}

exports.updateComponent = async (event, componentId, type, data, position, options = {}) => {
    options.new = true
    options.runValidators = true

    switch (type) {
        case 'TEXT':
            return await this.updateTextComponent(event._id, componentId, data, position, options)
        case 'PICTURE':
            return await this.updatePictureComponent(event._id, componentId, data, position, options)
        case 'VOTE':
            return await this.updateVoteComponent(event, componentId, data, position, options)
        case 'FORM':
            return await this.updateFormComponent(event, componentId, data, position, options)
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

exports.updateVoteComponent = async (event, componentId, data, position, options = {}) => {
    if (!validators.validateVoteData(data)) {
        throw new Error('Data for component type VOTE is not valid')
    }

    const updatePromises = data.options.map(option => {
        if (option._id) {
            return this.updateOptionInVoteComponent(event._id, componentId, option._id, option.label, options)
        } else {
            return this.addOptionToVoteComponent(event._id, componentId, option.label, options)
        }
    })

    const oldVoteComponent = event.components.find(component => component._id.toString() === componentId)

    oldVoteComponent.data.options.map(oldOption => {
        if (!data.options.some(option => option._id === oldOption._id.toString())) {
            const removePromise = this.removeOptionFromVoteComponent(event._id, componentId, oldOption._id)
            updatePromises.push(removePromise)
        }
    })

    await Promise.all(updatePromises)

    return await Event.findOneAndUpdate(
        { _id: event._id, 'components._id': componentId },
        { $set: { 'components.$.data.subject': data.subject, 'components.$.position': position } },
        options)
}

exports.updateOptionInVoteComponent = async (id, componentId, optionId, label, options = {}) => {
    if (!validators.validateLabel(label)) {
        throw new Error('Label of component option not valid')
    }
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId },
        { $set: { 'components.$.data.options.$[option].label': label } },
        { ...options, arrayFilters: [{ 'option._id': mongoose.Types.ObjectId(optionId) }] })
}

exports.addOptionToVoteComponent = async (id, componentId, label, options = {}) => {
    if (!validators.validateLabel(label)) {
        throw new Error('Label of component option not valid')
    }
    const option = {
        _id: mongoose.Types.ObjectId(),
        label: label,
        votes: []
    }
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId, },
        { $addToSet: { 'components.$.data.options': option } },
        options)
}

exports.removeOptionFromVoteComponent = async (id, componentId, optionId, options = {}) => {
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId, },
        { $pull: { 'components.$.data.options': { _id: optionId } } },
        options)
}

exports.updateFormComponent = async (event, componentId, data, position, options = {}) => {
    if (!validators.validateFormData(data)) {
        throw new Error('Data for component type FORM is not valid')
    }

    const updatePromises = data.questions.map(question => {
        if (question._id) {
            return this.updateQuestionInFormComponent(event._id, componentId, question._id, question.label, options)
        } else {
            return this.addQuestionToFormComponent(event._id, componentId, question.label, options)
        }
    })

    const oldFormComponent = event.components.find(component => component._id.toString() === componentId)

    oldFormComponent.data.questions.map(oldQuestion => {
        if (!data.questions.some(question => question._id === oldQuestion._id.toString())) {
            const removePromise = this.removeQuestionFromFormComponent(event._id, componentId, oldQuestion._id)
            updatePromises.push(removePromise)
        }
    })

    await Promise.all(updatePromises)

    return await Event.findOneAndUpdate(
        { _id: event._id, 'components._id': componentId },
        { $set: { 'components.$.position': position } },
        options)
}

exports.updateQuestionInFormComponent = async (id, componentId, questionId, label, options = {}) => {
    if (!validators.validateLabel(label)) {
        throw new Error('Label of component question not valid')
    }
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId },
        { $set: { 'components.$.data.questions.$[question].label': label } },
        { ...options, arrayFilters: [{ 'question._id': mongoose.Types.ObjectId(questionId) }] })
}

exports.addQuestionToFormComponent = async (id, componentId, label, options = {}) => {
    if (!validators.validateLabel(label)) {
        throw new Error('Label of component question not valid')
    }
    const question = {
        _id: mongoose.Types.ObjectId(),
        label: label,
        answers: []
    }
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId, },
        { $addToSet: { 'components.$.data.questions': question } },
        options)
}

exports.removeQuestionFromFormComponent = async (id, componentId, questionId, options = {}) => {
    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId, },
        { $pull: { 'components.$.data.questions': { _id: questionId } } },
        options)
}

exports.removeComponent = async (id, componentId, options = {}) => {
    options.new = true

    return await Event.findByIdAndUpdate(id, { $pull: { components: { _id: componentId } } }, options)
}

exports.addVoteToVoteComponent = async (event, componentId, optionId, userId, options = {}) => {
    options.new = true

    const component = event.components.find(component => component._id.toString() === componentId)

    if (component.type !== 'VOTE') {
        throw new Error('You can only vote in components of type VOTE')
    }

    for (let option of component.data.options) {
        if (option.votes.some(vote => vote.toString() === userId)) {
            await this.removeVoteFromVoteComponent(event._id, componentId, option._id, userId)
        }
    }

    const savedEvent = await Event.findOneAndUpdate(
        { _id: event._id, 'components._id': componentId },
        { $addToSet: { 'components.$.data.options.$[option].votes': mongoose.Types.ObjectId(userId) } },
        { ...options, arrayFilters: [{ 'option._id': mongoose.Types.ObjectId(optionId) }] })

    return await this.populate(savedEvent)
}

exports.removeVoteFromVoteComponent = async (id, componentId, optionId, userId, options = {}) => {
    options.new = true

    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId },
        { $pull: { 'components.$.data.options.$[option].votes': mongoose.Types.ObjectId(userId) } },
        { ...options, arrayFilters: [{ 'option._id': mongoose.Types.ObjectId(optionId) }] })
}

exports.addAnswersToFormComponent = async (event, componentId, answers, userId, options = {}) => {
    options.new = true

    const component = event.components.find(component => component._id.toString() === componentId)

    if (component.type !== 'FORM') {
        throw new Error('Component is not of type FORM')
    }

    if (!validators.validateAnswers(answers)) {
        throw new Error('Answers are not valid')
    }

    const removePromises = []

    for (let question of component.data.questions) {
        if (question.answers.some(answer => answer.user.toString() === userId)) {
            const removePromise = this.removeAnswerFromFormComponent(event._id, componentId, question._id, userId)
            removePromises.push(removePromise)
        }
    }

    await Promise.all(removePromises)

    const updatePromises = []

    for (let answer of answers) {
        const answerObject = {
            content: answer.content,
            user: mongoose.Types.ObjectId(userId)
        }
        const updatePromise = Event.findOneAndUpdate(
            { _id: event._id, 'components._id': componentId },
            { $addToSet: { 'components.$.data.questions.$[question].answers': answerObject } },
            { ...options, arrayFilters: [{ 'question._id': mongoose.Types.ObjectId(answer.question) }] })

        updatePromises.push(updatePromise)
    }

    await Promise.all(updatePromises)

    const savedEvent = await Event.findById(event._id)

    return await this.populate(savedEvent)
}

exports.removeAnswerFromFormComponent = async (id, componentId, questionId, userId, options = {}) => {
    options.new = true

    return await Event.findOneAndUpdate(
        { _id: id, 'components._id': componentId },
        { $pull: { 'components.$.data.questions.$[question].answers': { user: mongoose.Types.ObjectId(userId) } } },
        { ...options, arrayFilters: [{ 'question._id': mongoose.Types.ObjectId(questionId) }] })
}

exports.addRegistration = async (event, name, senderId) => {
    const registration = {}

    if (senderId) {
        const oldRegistration = event.registrations.find(registration => {
            if (registration.user) {
                return registration.user._id.toString() === senderId
            }
            return false
        })

        if (oldRegistration) {
            throw new Error('User has already joined')
        }

        registration.user = senderId
    } else if (name) {
        registration.name = name
    } else {
        throw new Error('Required information not provided')
    }

    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        if (senderId) {
            await userService.addToMyInvites(senderId, event._id, options)
        }

        const savedEvent = await Event.findByIdAndUpdate(event._id,
            { $push: { registrations: registration } },
            { ...options, new: true, runValidators: true })

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not add registration')
    }
}

exports.removeRegistration = async (event, registration) => {

    const session = await Event.startSession()
    session.startTransaction()
    const options = { session }

    try {
        if (registration.user) {
            await userService.removeFromMyInvites(registration.user, event._id, options)
        }

        const savedEvent = await Event.findByIdAndUpdate(event._id,
            { $pull: { registrations: { _id: registration._id } } },
            { ...options, new: true })

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not remove registration')
    }
}