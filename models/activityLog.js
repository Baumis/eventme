const mongoose = require('mongoose')

const logEntry = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MESSAGE', 'COMMENT', 'CREATE', 'JOIN'],
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300
    },
    data: Object,
    _id: false
})

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entries: [logEntry]
})

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema)

module.exports = ActivityLog