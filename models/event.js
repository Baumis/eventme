const mongoose = require('mongoose')
const messageSchema = require('./messageSchema')

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

const infoPanelEntrySchema = new mongoose.Schema({
    icon: {
        type: String,
        enum: ['PHONE', 'EMAIL', 'LOCATION', 'INFO', 'TIME', 'DATE', 'CONTACT', 'EMPTY'],
        default: 'EMPTY',
        required: [true, 'Infopanel entry logo required']
    },
    text: {
        type: String,
        default: '',
        maxlength: [144, 'Infopanel entry text too long']
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
        default: 'https://picsum.photos/1440/550',
        maxlength: [2048, 'Url too long']
    },
    infoPanel: [infoPanelEntrySchema],
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
    infoPanel: event.infoPanel,
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
    infoPanel: event.infoPanel,
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
    background: event.background,
    infoPanel: event.infoPanel
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event