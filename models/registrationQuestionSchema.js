const mongoose = require('mongoose')

const registrationQuestionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['QUESTION'],
        required: [true, 'Type required']
    },
    data: {
        type: Object,
        default: {},
        required: true
    }
})

module.exports = registrationQuestionSchema