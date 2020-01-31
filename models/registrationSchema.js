const mongoose = require('mongoose')
const answerSchema = require('./answerSchema')

const registrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true,
        minlength: [3, 'Name too short'],
        maxlength: [70, 'Name too long']
    },
    answers: [answerSchema]
})

module.exports = registrationSchema