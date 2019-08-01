const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    order: {
        type: Number,
        required: [true, 'Order required']
    },
    type: {
        type: String,
        enum: ['PLACEHOLDER', 'TEXT', 'VIDEO', 'LOCATION', 'GUESTS', 'PICTURE', 'INVITE_LINK'],
        default: 'PLACEHOLDER',
        required: [true, 'Type required']
    },
    data: Object,
    _id: false
})

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
        default: 'My Event',
        trim: true,
        required: [true, 'Label required'],
        minlength: [3, 'Label too short'],
        maxlength: [144, 'Label too long']
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    inviteKey: {
        type: String,
        default: mongoose.Types.ObjectId().toHexString()
    },
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

eventSchema.statics.format = (event) => ({
    _id: event._id,
    label: event.label,
    creator: event.creator,
    inviteKey: event.inviteKey,
    background: event.background,
    infoPanel: event.infoPanel,
    guests: event.guests,
    components: event.components
})

eventSchema.statics.formatForGuest = (event) => ({
    _id: event._id,
    label: event.label,
    creator: event.creator,
    background: event.background,
    infoPanel: event.infoPanel,
    guests: event.guests,
    components: event.components
})

eventSchema.statics.formatForGhost = (event) => ({
    _id: event._id,
    label: event.label,
    creator: event.creator,
    background: event.background,
    infoPanel: event.infoPanel
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event