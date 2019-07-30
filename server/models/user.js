const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username required'],
        minlength: [3, 'Username too short'],
        maxlength: [70, 'Username too long']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Name required'],
        minlength: [3, 'Name too short'],
        maxlength: [70, 'Name too long']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email required'],
        minlength: [3, 'Email too short'],
        maxlength: [255, 'Email too long'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email not valid']
    },
    passwordHash: {
        type: String,
        required: [true, 'Password required']
    },
    myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    myInvites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
})

userSchema.statics.format = (user) => ({
    _id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    myEvents: user.myEvents,
    myInvites: user.myInvites
})

userSchema.statics.formatForGuest = (user) => ({
    _id: user._id,
    username: user.username,
    name: user.name,
    myEvents: user.myEvents,
    myInvites: user.myInvites
})

userSchema.statics.formatForGhost = (user) => ({
    _id: user._id,
    username: user.username,
    name: user.name
})

const User = mongoose.model('User', userSchema) 

module.exports = User