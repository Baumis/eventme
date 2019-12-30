const mongoose = require('mongoose')

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
    }
})

module.exports = registrationSchema