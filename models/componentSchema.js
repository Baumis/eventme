const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['TEXT', 'GUESTS', 'INVITE_LINK', 'DISCUSSION', 'PICTURE'],
        required: [true, 'Type required']
    },
    data: {
        type: Object,
        default: {},
        required: true
    },
    _id: false
})

module.exports = componentSchema