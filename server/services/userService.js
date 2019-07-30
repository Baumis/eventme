const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.getAllPopulated = async () => {
    return await User
        .find({})
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })
}

exports.getOnePopulated = async (id) => {
    return await User
        .findById(id)
        .populate('myEvents', { _id: 1, label: 1, background: 1 })
        .populate('myInvites', { _id: 1, label: 1, background: 1 })
}

exports.getOneByEmail = async (email) => {
    return await User.findOne({ email })
}

exports.create = async (userObject) => {
    const existingUser = await this.getOneByEmail(userObject.email)

    if (existingUser) {
        throw new Error('Email must be unique')
    }

    if (!userObject.password || userObject.password.length < 3) {
        throw new Error('Password too short')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userObject.password, saltRounds)

    const user = new User({
        username: userObject.username,
        name: userObject.name,
        email: userObject.email,
        passwordHash
    })

    const error = user.validateSync()

    if (error) {
        const errorMessages = Object.keys(error.errors).map(field => error.errors[field])
        throw new Error(errorMessages.join(', '))
    }

    return await user.save()
}