const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    passwordHash: String,
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

const User = mongoose.model('User', userSchema) 

module.exports = User