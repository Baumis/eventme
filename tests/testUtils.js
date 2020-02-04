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

exports.newUserObject = {
    name: 'New name',
    email: 'new.email@mail.com',
    avatar: 'www.picture.com/avatarjpg',
    cover: 'www.picture.com/coverjpg'
}

exports.eventObject = {
    label: 'First event',
    description: 'This is the description',
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000),
    registrationQuestions: []
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
            type: 'PICTURE',
            data: {
                url: 'www.validpictureurl.fi',
                expand: true
            }
        },
        {
            type: 'VOTE',
            data: {
                subject: 'My subject',
                options: [
                    {
                        label: 'first option'
                    },
                    {
                        label: 'second option'
                    }
                ]
            }
        },
        {
            type: 'FORM',
            data: {
                questions: [
                    {
                        label: 'What is your name?'
                    },
                    {
                        label: 'What do you eat?'
                    }
                ]
            }
        }
    ],
    registrationQuestions: []
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