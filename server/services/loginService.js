const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.login = async (email, password) => {

    const user = await User.findOne({ email })
    const passwordCorrect = user === null ?
        false :
        await bcrypt.compare(password, user.passwordHash)

    if (!user || !passwordCorrect) {
        throw new Error('Invalid email or password')
    }

    const userForToken = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1d' })

    return {
        _id: user._id,
        token
    }
}