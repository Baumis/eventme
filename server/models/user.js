const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    passwordHash: String
})

userSchema.statics.format = (user) => {
    return {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email
    }
}

const User = mongoose.model('User', userSchema) 

module.exports = User