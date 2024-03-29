const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['LOCAL', 'GOOGLE', 'FACEBOOK'],
        default: 'LOCAL',
        required: [true, 'User type required']
    },
    userPlan: {
        type: String,
        enum: ['FREE', 'PREMIUM'],
        default: 'FREE',
        required: [true, 'User plan required']
    },
    public: {
        type: Boolean,
        default: false
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
        maxlength: [2048, 'Url too long'],
        match: [/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'Avatar url not valid']
    },
    cover: {
        type: String,
        default: 'https://images.unsplash.com/photo-1495312040802-a929cd14a6ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2978&q=80',
        maxlength: [2048, 'Url too long'],
        match: [/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'Cover url not valid']
    },
    description: {
        type: String,
        default: '',
        maxlength: [10000, 'Description too long']
    },
    passwordHash: {
        type: String
    },
    myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    myInvites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
})

const formatEvents = (events) => {
    return events.map(event => ({
        _id: event._id,
        label: event.label,
        creator: event.creator,
        background: event.background,
        url: event._id + event.urlmodifier,
        startDate: event.startDate,
        endDate: event.endDate,
        registrationAmount: event.registrations.length,
        public: event.public
    }))
}

const formatAndFilterEvents = (events) => {
    return formatEvents(events).filter(event => event.public)
}

userSchema.statics.format = (user) => {
    const oneWeekBack = new Date(new Date() - 1000 * 60 * 60 * 24 * 7)

    const myEvents = formatEvents(user.myEvents)
    const myCurrentEvents = myEvents.filter(event => event.endDate >= oneWeekBack)
    const myPastEvents = myEvents.filter(event => event.endDate < oneWeekBack)
    myPastEvents.sort((a, b) => b.startDate - a.startDate)
    const myInvites = formatEvents(user.myInvites)
    const myCurrentInvites = myInvites.filter(event => event.endDate >= oneWeekBack)
    const myPastInvites = myInvites.filter(event => event.endDate < oneWeekBack)
    myPastInvites.sort((a, b) => b.startDate - a.startDate)

    const formattedUser = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        userType: user.userType,
        userPlan: user.userPlan,
        avatar: user.avatar,
        cover: user.cover,
        description: user.description,
        myEvents: myCurrentEvents,
        myPastEvents: myPastEvents,
        myInvites: myCurrentInvites,
        myPastInvites: myPastInvites
    }
    return formattedUser
}

userSchema.statics.formatForGuest = (user) => {
    const oneWeekBack = new Date(new Date() - 1000 * 60 * 60 * 24 * 7)

    const myEvents = formatAndFilterEvents(user.myEvents)
    const myCurrentEvents = myEvents.filter(event => event.endDate >= oneWeekBack)
    const myPastEvents = myEvents.filter(event => event.endDate < oneWeekBack)
    myPastEvents.sort((a, b) => b.startDate - a.startDate)
    const myInvites = formatAndFilterEvents(user.myInvites)
    const myCurrentInvites = myInvites.filter(event => event.endDate >= oneWeekBack)
    const myPastInvites = myInvites.filter(event => event.endDate < oneWeekBack)
    myPastInvites.sort((a, b) => b.startDate - a.startDate)

    const formattedUser = {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        cover: user.cover,
        description: user.description,
        myEvents: myCurrentEvents,
        myPastEvents: myPastEvents,
        myInvites: myCurrentInvites,
        myPastInvites: myPastInvites
    }
    return formattedUser
}

userSchema.statics.formatForGhost = (user) => ({
    _id: user._id,
    name: user.name,
    avatar: user.avatar
})

userSchema.statics.formatForLogin = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    userType: user.userType,
    userPlan: user.userPlan,
    cover: user.cover,
    avatar: user.avatar
})

userSchema.statics.generateToken = (user, expiresIn = '7d') => {
    const userForToken = {
        email: user.email,
        id: user._id
    }

    return jwt.sign(userForToken, process.env.SECRET, { expiresIn })
}

userSchema.statics.generateEmailVerificationToken = (user, expiresIn = '7d') => {
    const userForToken = {
        email: user.email,
        id: user._id
    }

    return jwt.sign(userForToken, process.env.EMAIL_VERIFICATION_SECRET, { expiresIn })
}

const User = mongoose.model('User', userSchema)

module.exports = User