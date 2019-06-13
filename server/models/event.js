const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    order: Number,
    type: {
        type: String,
        enum: ['PLACEHOLDER', 'TEXT', 'VIDEO', 'LOCATION', 'GUESTLIST', 'PICTURE'],
        default: 'PLACEHOLDER'
    },
    data: Object,
    _id: false
})

const guestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['GOING', 'PENDING', 'NOT GOING', 'MABYE'],
        default: 'PENDING'
    },
    _id: false
})

const eventSchema = new mongoose.Schema({
    label: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    settings: {
        background: String,
        theme: {
            type: String,
            enum: ['LIGHT', 'DARK'],
            default: 'LIGHT'
        }
    },
    infoPanel: {
        phone: String,
        email: String,
        contact: String,
        address: String,
        date: Date
    },
    guests: [guestSchema],
    components: [componentSchema]
})

eventSchema.statics.format = (event) => {
    return {
        _id: event._id,
        label: event.label,
        creator: event.creator,
        settings: event.settings,
        infoPanel: event.infoPanel,
        guests: event.guests,
        components: event.components
    }
}

const Event = mongoose.model('Event', eventSchema)

module.exports = Event