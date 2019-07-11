const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    order: Number,
    type: {
        type: String,
        enum: ['PLACEHOLDER', 'TEXT', 'VIDEO', 'LOCATION', 'GUESTS', 'PICTURE', 'INVITE_LINK'],
        default: 'PLACEHOLDER'
    },
    data: Object,
    _id: false
})

const guestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['GOING', 'PENDING', 'DECLINED', 'MABYE'],
        default: 'PENDING'
    },
    _id: false
})

const infoPanelSchema = new mongoose.Schema({
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    contact: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now()
    },
    _id: false
})

const eventSchema = new mongoose.Schema({
    label: {
        type: String,
        default: 'My Event'
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    background: {
        type: String,
        default: 'https://picsum.photos/1440/550'
    },
    infoPanel: {
        type: infoPanelSchema,
        default: {}
    },
    guests: [guestSchema],
    components: [componentSchema]
})

eventSchema.statics.format = (event) => {
    return {
        _id: event._id,
        label: event.label,
        creator: event.creator,
        background: event.background,
        infoPanel: event.infoPanel,
        guests: event.guests,
        components: event.components
    }
}

const Event = mongoose.model('Event', eventSchema)

module.exports = Event