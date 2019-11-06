const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['TEXT', 'INVITE_LINK', 'PICTURE'],
        required: [true, 'Type required']
    },
    data: {
        type: Object,
        default: {},
        required: true
    },
    position: {
        type: Number,
        required: true
    }
})

module.exports = componentSchema