const mongoose = require('mongoose')

const componentSchema = new mongoose.Schema({
    order: {
        type: Number
    },
    type: {
        type: String,
        enum: ['TEXT', 'GUESTS', 'INVITE_LINK'],
        required: [true, 'Type required']
    },
    data: {
        type: Object,
        default: {}
    },
    _id: false
})

module.exports = componentSchema