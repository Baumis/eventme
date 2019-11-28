const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['LOCAL', 'GOOGLE'],
        default: 'LOCAL',
        required: [true, 'User type required']
    },
    externalId: {
        type: String
    },
    username: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: [3, 'Username too short'],
        maxlength: [30, 'Username too long']
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
        required: [true, 'Email required'],
        minlength: [3, 'Email too short'],
        maxlength: [255, 'Email too long'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email not valid']
    },
    emailVerified: {
        type: Boolean,
        required: [true, 'Email verification status required']
    },
    avatar: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
        maxlength: [2048, 'Url too long'],
        match: [/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'Avatar url not valid']
    },
    cover: {
        type: String,
        default: 'https://images.unsplash.com/photo-1495312040802-a929cd14a6ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2978&q=80',
        maxlength: [2048, 'Url too long'],
        match: [/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'Cover url not valid']
    },
    passwordHash: {
        type: String
    },
    myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    myInvites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
})

userSchema.statics.format = (user) => ({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    cover: user.cover,
    myEvents: user.myEvents,
    myInvites: user.myInvites
})

userSchema.statics.formatForGuest = (user) => ({
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    cover: user.cover,
    myEvents: user.myEvents,
    myInvites: user.myInvites
})

userSchema.statics.formatForGhost = (user) => ({
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    cover: user.cover,
})

userSchema.statics.formatForLogin = (user) => ({
    _id: user._id,
    email: user.email,
    name: user.name,
    cover: user.cover,
    avatar: user.avatar
})

userSchema.statics.generateToken = (user) => {
    const userForToken = {
        email: user.email,
        id: user._id
    }

    return jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1d' })
}

const User = mongoose.model('User', userSchema)

module.exports = User