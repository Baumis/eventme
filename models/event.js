const mongoose = require('mongoose')
const messageSchema = require('./messageSchema')
const componentSchema = require('./componentSchema')

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
    inviteKey: {
        type: String,
        default: mongoose.Types.ObjectId().toHexString()
    },
    background: {
        type: String,
        default: 'https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80',
        maxlength: [2048, 'Url too long'],
        match: [/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'Background url not valid']
    },
    guests: [guestSchema],
    components: [componentSchema],
    discussion: [messageSchema]
})

eventSchema.statics.format = (event) => ({
    _id: event._id,
    label: event.label,
    startDate: event.startDate,
    endDate: event.endDate,
    creator: event.creator,
    inviteKey: event.inviteKey,
    background: event.background,
    guests: event.guests,
    components: event.components,
    discussion: event.discussion
})

eventSchema.statics.formatForGuest = (event) => ({
    _id: event._id,
    label: event.label,
    startDate: event.startDate,
    endDate: event.endDate,
    creator: event.creator,
    background: event.background,
    guests: event.guests,
    components: event.components,
    discussion: event.discussion
})

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