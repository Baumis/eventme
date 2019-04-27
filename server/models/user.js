const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    passwordHash: String
})

const User = mongoose.model('User', userSchema)

module.exports = User