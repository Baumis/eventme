const User = require('../models/user')

exports.user = {
    username: 'johndoe',
    name: 'John Doe',
    password: 'secret',
    email: 'john.doe@test.com'
}

exports.nonExistingUserId = async () => {
    const user = new User({
        userType: 'LOCAL',
        name: 'Temp Tom',
        username: 'temptom',
        email: 'temp.tom@test.com',
        emailVerified: false,
        passwordHash: 'hashedsecret'
    })
    await user.save()
    await user.remove()

    return user._id.toString()
}

exports.addAndGetUser = async () => {
    const user = new User({
        userType: 'LOCAL',
        name: 'Temp Tom',
        username: 'temptom',
        email: 'temp.tom@test.com',
        emailVerified: false,
        passwordHash: 'hashedsecret'
    })
    await user.save()

    return user
}