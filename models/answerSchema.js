const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    _id: false,
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        maxlength: [1000, 'Content too long'],
        default: ''
    }
})

module.exports = answerSchema