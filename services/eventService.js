const Event = require('../models/event')
const userService = require('./userService')
const pictureService = require('./pictureService')
const validators = require('../utils/validators')
const helpers = require('../utils/helpers')

exports.populate = async (event) => {
    const populatedEvent = await event
        .populate('creator', { _id: 1, name: 1, avatar: 1 })
        .populate('registrations.user', { _id: 1, name: 1, avatar: 1 })
        .populate('discussion.author', { _id: 1, name: 1, avatar: 1 })
        .populate('discussion.comments.author', { _id: 1, name: 1, avatar: 1 })
        .execPopulate()

    return populatedEvent
}

exports.getOne = async (id) => {
    return await Event.findById(id)
}

exports.create = async (creatorId, eventObject) => {
    const startDate = eventObject.startDate ? new Date(eventObject.startDate) : new Date()
    const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24)

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
        registrationQuestions: eventObject.registrationQuestions,
        registrations: [{
            user: creatorId
        }],
        publicAnswers: eventObject.publicAnswers,
        allowAlias: eventObject.allowAlias,
        urlmodifier: helpers.makeId(5),
        public: eventObject.public
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
    const endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24)

    if (!validators.validateDates(startDate, endDate)) {
        throw new Error('End Date must be greater than Start Date')
    }

    if (!validators.validateRegistrationQuestions(eventObject.registrationQuestions)) {
        throw new Error('RegistrationQuestions are not valid')
    }

    const updateObject = {
        label: eventObject.label,
        description: eventObject.description,
        startDate: startDate,
        endDate: endDate,
        background: eventObject.background,
        registrationQuestions: eventObject.registrationQuestions,
        publicAnswers: eventObject.publicAnswers,
        registrationLimit: eventObject.registrationLimit,
        allowAlias: eventObject.allowAlias,
        public: eventObject.public
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

        for (let registration of event.registrations) {
            if (registration.user) {
                await userService.removeFromMyInvites(registration.user, event._id, options)
            }
        }

        await pictureService.deleteAllByEvent(event._id)

        await session.commitTransaction()
        session.endSession()

    } catch (exception) {
        console.log(exception)
        await session.abortTransaction()
        session.endSession()
        throw new Error('Could not remove event')
    }
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

exports.addRegistration = async (event, name, senderId, answers) => {
    if (event.registrations.length >= event.registrationLimit) {
        throw new Error('Event is full')
    }

    if (answers) {
        for (let answer of answers) {
            const questionExists = event.registrationQuestions.find(question => question._id.toString() === answer.questionId)
            if (!questionExists) {
                throw new Error('Question for provided answer does not exist')
            }
        }
    }

    const registration = { answers }

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
    } else if (event.allowAlias && name) {
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
            { $push: { registrations: { $each: [registration], $position: 0} } },
            { ...options, new: true, runValidators: true })

        const populatedEvent = await this.populate(savedEvent)

        await session.commitTransaction()
        session.endSession()

        return populatedEvent

    } catch (exception) {
        console.log(exception)
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

exports.changeUrlmodifier = async (event) => {
    const newUrlmodifier = helpers.makeId(5)
    const updatedEvent = await Event.findByIdAndUpdate(event._id, { urlmodifier: newUrlmodifier }, { new: true })

    return await this.populate(updatedEvent)
}

exports.updateAnswer = async (event, registrationId, questionId, content) => {
    const registration = event.registrations.find(registration => registration._id.toString() === registrationId)

    if (!registration) {
        throw new Error('Malformatted registration id')
    }

    const question = event.registrationQuestions.find(question => question._id.toString() === questionId)

    if (!question) {
        throw new Error('Malformatted question id')
    }

    const answer = registration.answers.find(answer => answer.questionId.toString() === questionId)

    if (answer) {
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: event._id, 'registrations._id': registration._id },
            { $set: { 'registrations.$.answers.$[answer].content': content } },
            { arrayFilters: [{ 'answer.questionId': questionId }], new: true })

        return await this.populate(updatedEvent)
    } else {
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: event._id, 'registrations._id': registration._id },
            { $push: { 'registrations.$.answers': { questionId, content } } },
            { new: true })

        return await this.populate(updatedEvent)
    }
}