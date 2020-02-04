const mongoose = require('mongoose')
const messageSchema = require('./messageSchema')
const componentSchema = require('./componentSchema')
const registrationSchema = require('./registrationSchema')
const registrationQuestionSchema = require('./registrationQuestionSchema')

const guestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['GOING', 'PENDING', 'DECLINED', 'MABYE'],
        default: 'PENDING',
        required: [true, 'Status required']
    },
    _id: false
})

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
    guests: [guestSchema],
    components: [componentSchema],
    discussion: [messageSchema],
    registrations: [registrationSchema],
    registrationQuestions: [registrationQuestionSchema]
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
        guests: event.guests,
        components: event.components,
        discussion: event.discussion,
        registrations: formattedRegistrations,
        registrationQuestions: event.registrationQuestions
    }
    return formattedEvent
}

eventSchema.statics.formatForGuest = (event, guestId) => {
    const formattedComponents = event.components.map(component => {
        if (component.type === 'FORM') {
            component.data.questions = component.data.questions.map(question => {
                question.answers = question.answers.filter(answer => answer.user._id.toString() === guestId)
                return question
            })
        }
        return component
    })

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
            answers: user._id && user._id.toString() === guestId ? registration.answers : []
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
        guests: event.guests,
        components: formattedComponents,
        discussion: event.discussion,
        registrations: formattedRegistrations,
        registrationQuestions: event.registrationQuestions
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