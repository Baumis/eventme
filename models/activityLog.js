const mongoose = require('mongoose')

const logEntry = new mongoose.Schema({
    type: {
        type: String,
        enum: ['JOINED_EVENT', 'LEFT_EVENT', 'CREATED_EVENT', 'UPDATED_EVENT', 'CHANGED_STATUS', 'DELETED_EVENT', 'WROTE_MESSAGE', 'DELETED_MESSAGE', 'WROTE_COMMENT', 'DELETED_COMMENT', 'CREATED_USER', 'UPDATED_USER'],
        required: true
    },
    data: Object,
    time: {
        type: Date,
        default: Date.now,
        required: true
    }
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