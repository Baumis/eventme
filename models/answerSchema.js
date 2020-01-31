const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        minlength: [1, 'Content too short'],
        maxlength: [1000, 'Content too long'],
        required: true
    }
})

module.exports = answerSchema