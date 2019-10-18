const User = require('../models/user')

exports.userObject = {
    username: 'johndoe',
    name: 'John Doe',
    password: 'secret',
    email: 'john.doe@test.com'
}

exports.user2Object = {
    username: 'millers',
    name: 'Frederic Millers',
    password: 'secret',
    email: 'frederic.millers@mail.com'
}

exports.user3Object = {
    username: 'mara',
    name: 'Mara Mara',
    password: 'secret2',
    email: 'mara.mara@mail.com'
}

exports.eventObject = {
    label: 'First event',
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000)
}

exports.newEventObject = {
    label: 'This is my new label',
    startDate: new Date(),
    endDate: new Date(),
    background: 'www.beautifulpictures.org',
    components: [
        {
            type: 'TEXT',
            data: {
                title: 'New Title',
                content: 'The content'
            }
        },
        {
            type: 'GUESTS',
            data: {}
        },
        {
            type: 'INVITE_LINK',
            data: {}
        },
        {
            type: 'PICTURE',
            data: {
                url: 'www.validpictureurl.fi',
                expand: true
            }
        }
    ]
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