const mongoose = require('mongoose')
const messageSchema = require('./messageSchema')
const registrationSchema = require('./registrationSchema')
const registrationQuestionSchema = require('./registrationQuestionSchema')

const eventSchema = new mongoose.Schema({
    label: {
        type: String,
        default: 'My Event',
        trim: true,
        required: [true, 'Label required'],
        minlength: [1, 'Label too short'],
        maxlength: [144, 'Label too long']
    },
    description: {
        type: String,
        default: '',
        maxlength: [10000, 'Description too long']
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Startdate required']
    },
    endDate: {
        type: Date,
        default: Date.now,
        required: [true, 'Enddate required']
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    background: {
        type: String,
        default: 'https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80',
        maxlength: [2048, 'Url too long']
    },
    discussion: [messageSchema],
    registrations: [registrationSchema],
    registrationQuestions: [registrationQuestionSchema],
    publicAnswers: {
        type: Boolean,
        default: true
    },
    allowAlias: {
        type: Boolean,
        default: true
    },
    urlmodifier: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 5,
        default: '0wl2o',
        required: true
    }
})

eventSchema.statics.format = (event) => {
    
    const formattedRegistrations = event.registrations.map(registration => {
        let user

        if (registration.user) {
            user = registration.user
        } else {
            user = {
                name: registration.name,
                avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
            }
        }

        const formattedRegistration = {
            _id: registration._id,
            user,
            answers: registration.answers
        }

        return formattedRegistration
    })

    const formattedEvent = {
        _id: event._id,
        label: event.label,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        creator: event.creator,
        background: event.background,
        discussion: event.discussion,
        registrations: formattedRegistrations,
        registrationQuestions: event.registrationQuestions,
        publicAnswers: event.publicAnswers,
        allowAlias: event.allowAlias,
        url: event._id + event.urlmodifier
    }
    return formattedEvent
}

eventSchema.statics.formatForGuest = (event, guestId) => {

    const formattedRegistrations = event.registrations.map(registration => {
        let user

        if (registration.user) {
            user = registration.user
        } else {
            user = {
                name: registration.name,
                avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
            }
        }

        const formattedRegistration = {
            _id: registration._id,
            user,
            answers: event.publicAnswers || user._id && user._id.toString() === guestId ? registration.answers : []
        }

        return formattedRegistration
    })

    const formattedEvent = {
        _id: event._id,
        label: event.label,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        creator: event.creator,
        background: event.background,
        discussion: event.discussion,
        registrations: formattedRegistrations,
        registrationQuestions: event.registrationQuestions,
        publicAnswers: event.publicAnswers,
        allowAlias: event.allowAlias,
        url: event._id + event.urlmodifier
    }
    return formattedEvent
}

eventSchema.statics.formatForGhost = (event) => ({
    _id: event._id,
    label: event.label,
    startDate: event.startDate,
    endDate: event.endDate,
    creator: event.creator,
    background: event.background
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event