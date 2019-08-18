const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content required'],
        minlength: [1, 'Comment too short'],
        maxlength: [1000, 'Comment too long']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'Author required']
    },
    time: {
        type: Date,
        required: [true, 'Time required'],
        default: Date.now
    }
})

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content required'],
        minlength: [1, 'Message too short'],
        maxlength: [5000, 'Message too long']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: [true, 'Author required']
    },
    time: {
        type: Date,
        required: [true, 'Time required'],
        default: Date.now
    },
    comments: [commentSchema]
})

module.exports = messageSchema