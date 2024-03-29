const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const config = require('../utils/config')
const User = require('../models/user')
const Event = require('../models/event')
const testUtils = require('./testUtils')

const api = supertest(app)
let server

// Variables for tests
const eventObject = testUtils.eventObject
const newEventObject = testUtils.newEventObject
let event = null
const userObject = testUtils.userObject
const user2Object = testUtils.user2Object
const user3Object = testUtils.user3Object
let user = null
let user2 = null
let user3 = null
let userCookie = null
let user2Cookie = null
let user3Cookie = null

beforeAll(async () => {
    await mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    server = app.listen(config.port)
})

beforeEach(async () => {
    await User.deleteMany({})
    await Event.deleteMany({})

    const res = await api
        .post('/api/users')
        .send(userObject)

    userCookie = res
        .headers['set-cookie'][0]
        .split(',')
        .map(item => item.split(';')[0])
        .join(';')

    user = res.body

    const res2 = await api
        .post('/api/users')
        .send(user2Object)

    user2Cookie = res2
        .headers['set-cookie'][0]
        .split(',')
        .map(item => item.split(';')[0])
        .join(';')

    user2 = res2.body

    const res3 = await api
        .post('/api/users')
        .send(user3Object)

    user3Cookie = res3
        .headers['set-cookie'][0]
        .split(',')
        .map(item => item.split(';')[0])
        .join(';')

    user3 = res3.body

    const res4 = await api
        .post('/api/events')
        .set('Cookie', userCookie)
        .send(eventObject)

    event = res4.body
})

describe('POST /api/events', () => {

    it('should succeed and create a new event with correct response', async () => {
        const amountInBeginning = await Event.countDocuments()

        const res = await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(eventObject)
            .expect(201)

        const amountInEnd = await Event.countDocuments()

        expect(amountInBeginning + 1).toEqual(amountInEnd)
        expect.stringContaining(res.body._id)
        expect(res.body.label).toEqual(eventObject.label)
        expect(res.body.description).toEqual(eventObject.description)
        expect(new Date(res.body.startDate)).toEqual(eventObject.startDate)
        expect(res.body.creator._id).toEqual(user._id)
        expect.stringContaining(res.body.background)
        expect.arrayContaining(res.body.discussion)
    })

    it('should succeed and be listed in users myEvents', async () => {
        const res = await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(eventObject)
            .expect(201)

        const userInEnd = await User.findById(user._id)

        expect(userInEnd.myEvents).toContainEqual(mongoose.Types.ObjectId(res.body._id))
    })

    it('should fail if not authenticated', async () => {
        await api
            .post('/api/events')
            .expect(401)
    })

    it('should fail if label not given or not valid', async () => {
        const amountInBeginning = await Event.countDocuments()
        const userInBeginning = await User.findById(user._id)

        const notValidEvent = {
            ...eventObject,
            label: ''
        }

        const notValidEvent2 = {
            ...eventObject,
            label: {
                label: 'fail'
            }
        }

        await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(notValidEvent)
            .expect(400)

        await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(notValidEvent2)
            .expect(400)

        const amountInEnd = await Event.countDocuments()
        const userInEnd = await User.findById(user._id)

        expect(amountInBeginning).toEqual(amountInEnd)
        expect(userInBeginning.myEvents.length).toEqual(userInEnd.myEvents.length)
    })

})

describe('GET /api/events/:id', () => {

    it('should succeed and return correct event to creator', async () => {
        const res = await api
            .get('/api/events/' + event.url)
            .set('Cookie', userCookie)
            .expect(200)

        expect(res.body._id).toEqual(event._id)
        expect(res.body.label).toEqual(event.label)
        expect(res.body.startDate).toEqual(event.startDate)
        expect(res.body.creator).toEqual(event.creator)
        expect(res.body.background).toEqual(event.background)
        expect(res.body.discussion).toEqual(event.discussion)
    })

    it('should fail if event not existing', async () => {
        await api
            .get('/api/events/' + mongoose.Types.ObjectId())
            .set('Cookie', userCookie)
            .expect(400)
    })
})

describe('PUT /api/events/:id', () => {

    it('should succeed and update event with correct response', async () => {
        const res = await api
            .put('/api/events/' + event._id)
            .set('Cookie', userCookie)
            .send(newEventObject)
            .expect(200)

        expect(res.body._id).toEqual(event._id)
        expect(res.body.label).toEqual(newEventObject.label)
        expect(new Date(res.body.startDate)).toEqual(newEventObject.startDate)
        expect(res.body.creator).toEqual(event.creator)
        expect(res.body.background).toEqual(newEventObject.background)
    })

    it('should fail if not authenticated', async () => {
        await api
            .put('/api/events/' + event._id)
            .expect(401)
    })

    it('should fail if label too short', async () => {
        const notValidEventObject = {
            ...newEventObject,
            label: ''
        }

        await api
            .put('/api/events/' + event._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if startDate not valid', async () => {
        const notValidEventObject = {
            ...newEventObject,
            startDate: 'Not a date',
        }

        await api
            .put('/api/events/' + event._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

})

describe('DELETE /api/events/:id', () => {

    it('should succeed with correct response', async () => {
        const amountInBeginning = await Event.countDocuments()
        await api
            .delete('/api/events/' + event._id)
            .set('Cookie', userCookie)
            .expect(204)

        const amountInEnd = await Event.countDocuments()
        const userInEnd = await User.findById(user._id)
        const user2InEnd = await User.findById(user2._id)

        expect(amountInBeginning - 1).toEqual(amountInEnd)
        expect(userInEnd.myEvents).not.toContainEqual(mongoose.Types.ObjectId(event._id))
        expect(user2InEnd.myInvites).not.toContainEqual(mongoose.Types.ObjectId(event._id))
    })

    it('should fail if not authenticated', async () => {
        const amountInBeginning = await Event.countDocuments()

        await api
            .delete('/api/events/' + event._id)
            .expect(401)

        const amountInEnd = await Event.countDocuments()
        expect(amountInBeginning).toEqual(amountInEnd)
    })

    it('should fail if trying to remove someone elses event', async () => {
        const amountInBeginning = await Event.countDocuments()

        await api
            .delete('/api/events/' + event._id)
            .set('Cookie', user2Cookie)
            .expect(403)

        const amountInEnd = await Event.countDocuments()
        expect(amountInBeginning).toEqual(amountInEnd)
    })
})

describe('POST api/events/:id/discussion', () => {

    it('should succeed and add a message to discussion', async () => {
        const res = await api
            .post('/api/events/' + event._id + '/discussion')
            .set('Cookie', userCookie)
            .send({ message: 'This is what I post' })
            .expect(200)

        const message = res.body.discussion[0]

        expect(message.content).toEqual('This is what I post')
        expect(message.author._id).toEqual(user._id)
        expect.stringContaining(message.time)
    })

    it('should succeed and add a message first in discussion array', async () => {
        await api
            .post('/api/events/' + event._id + '/discussion')
            .set('Cookie', userCookie)
            .send({ message: 'Hello everyone' })
            .expect(200)

        const res = await api
            .post('/api/events/' + event._id + '/discussion')
            .set('Cookie', user2Cookie)
            .send({ message: 'This is what you need' })
            .expect(200)

        const message = res.body.discussion[0]

        expect(message.content).toEqual('This is what you need')
        expect(message.author._id).toEqual(user2._id)
        expect.stringContaining(message.time)
    })

    it('should fail if message too short or undefined', async () => {
        await api
            .post('/api/events/' + event._id + '/discussion')
            .set('Cookie', userCookie)
            .send({ message: '' })
            .expect(400)

        await api
            .post('/api/events/' + event._id + '/discussion')
            .set('Cookie', userCookie)
            .expect(400)

        const eventInEnd = await Event.findById(event._id)

        expect(eventInEnd.discussion.some(message => message.content === '')).toBeFalsy()
    })
})

describe('POST api/events/:id/discussion/:messageId/comments', () => {

    let messageId = null

    beforeEach(async () => {
        const res = await api
            .post('/api/events/' + event._id + '/discussion')
            .set('Cookie', user2Cookie)
            .send({ message: 'My message is real' })

        messageId = res.body.discussion[0]._id
    })

    it('should succeed and add a comment to a message', async () => {
        const res = await api
            .post('/api/events/' + event._id + '/discussion/' + messageId + '/comments')
            .set('Cookie', userCookie)
            .send({ comment: 'Okey, nice to know' })
            .expect(200)

        const comments = res.body.discussion[0].comments
        comment = comments[comments.length - 1]

        expect(comment.content).toEqual('Okey, nice to know')
        expect(comment.author._id).toEqual(user._id)
        expect.stringContaining(comment.time)
    })

    it('should succeed and add a comment last in comments array', async () => {
        await api
            .post('/api/events/' + event._id + '/discussion/' + messageId + '/comments')
            .set('Cookie', userCookie)
            .send({ comment: 'Okey, nice to know' })
            .expect(200)

        const res2 = await api
            .post('/api/events/' + event._id + '/discussion/' + messageId + '/comments')
            .set('Cookie', user2Cookie)
            .send({ comment: 'This is what you look for' })
            .expect(200)

        const comments = res2.body.discussion[0].comments
        comment = comments[comments.length - 1]

        expect(comment.content).toEqual('This is what you look for')
        expect(comment.author._id).toEqual(user2._id)
        expect.stringContaining(comment.time)
    })

    it('should fail if not authenticated', async () => {
        await api
            .post('/api/events/' + event._id + '/discussion/' + messageId + '/comments')
            .send({ comment: 'Okey, nice to know' })
            .expect(401)

        const eventInEnd = await Event.findById(event._id)

        expect(eventInEnd.discussion[0].comments.length).toEqual(0)
    })

    it('should fail if comment too short or undefined', async () => {
        await api
            .post('/api/events/' + event._id + '/discussion/' + messageId + '/comments')
            .set('Cookie', user2Cookie)
            .send({ comment: '' })
            .expect(400)

        await api
            .post('/api/events/' + event._id + '/discussion/' + messageId + '/comments')
            .set('Cookie', userCookie)
            .expect(400)

        const eventInEnd = await Event.findById(event._id)

        expect(eventInEnd.discussion[0].comments.length).toEqual(0)
    })

    it('should fail if message not existing', async () => {
        await api
            .post('/api/events/' + event._id + '/discussion/' + mongoose.Types.ObjectId() + '/comments')
            .set('Cookie', userCookie)
            .send({ comment: 'My new comment' })
            .expect(400)
    })
})

describe('DELETE api/events/:id/discussion/:messageId', () => {

    let messageId = null

    beforeEach(async () => {
        const res = await api
            .post('/api/events/' + event._id + '/discussion')
            .set('Cookie', user2Cookie)
            .send({ message: 'My message is real' })

        messageId = res.body.discussion[0]._id
    })

    it('should succeed and remove message', async () => {
        const res2 = await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId)
            .set('Cookie', userCookie)
            .expect(200)

        const message = res2.body.discussion[0]

        expect(message.content).toBeNull()
        expect(message.author).toBeNull()
    })

    it('should succeed and remove own message', async () => {
        const res2 = await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId)
            .set('Cookie', user2Cookie)
            .expect(200)

        const message = res2.body.discussion[0]

        expect(message.content).toBeNull()
        expect(message.author).toBeNull()
    })

    it('should fail if not authenticated', async () => {
        await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId)
            .expect(401)

        const eventInEnd = await Event.findById(event._id)

        expect(eventInEnd.discussion[0].content).toEqual('My message is real')
        expect(eventInEnd.discussion[0].author.toString()).toEqual(user2._id)
    })

    it('should fail if requester not message writer or creator', async () => {
        await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId)
            .set('Cookie', user3Cookie)
            .expect(403)

        const eventInEnd = await Event.findById(event._id)

        expect(eventInEnd.discussion[0].content).toEqual('My message is real')
        expect(eventInEnd.discussion[0].author.toString()).toEqual(user2._id)
    })

    it('should fail if message not existing', async () => {
        await api
            .delete('/api/events/' + event._id + '/discussion/' + mongoose.Types.ObjectId())
            .set('Cookie', userCookie)
            .expect(400)
    })
})

describe('DELETE api/events/:id/discussion/:messageId/comments/:commentId', () => {

    let messageId = null
    let commentId = null

    beforeEach(async () => {
        const res = await api
            .post('/api/events/' + event._id + '/discussion')
            .set('Cookie', userCookie)
            .send({ message: 'This is what I post' })

        messageId = res.body.discussion[0]._id

        const res2 = await api
            .post('/api/events/' + event._id + '/discussion/' + messageId + '/comments')
            .set('Cookie', user2Cookie)
            .send({ comment: 'Okey, nice to know' })

        commentId = res2.body.discussion[0].comments[0]._id
    })

    it('should succeed and remove comment', async () => {
        const res = await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId + '/comments/' + commentId)
            .set('Cookie', userCookie)
            .expect(200)

        const comment = res.body.discussion[0].comments[0]

        expect(comment.content).toBeNull()
        expect(comment.author).toBeNull()
    })

    it('should succeed and remove own comment', async () => {
        const res = await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId + '/comments/' + commentId)
            .set('Cookie', user2Cookie)
            .expect(200)

        const comment = res.body.discussion[0].comments[0]

        expect(comment.content).toBeNull()
        expect(comment.author).toBeNull()
    })

    it('should fail if not authenticated', async () => {
        await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId + '/comments/' + commentId)
            .expect(401)

        const eventInEnd = await Event.findById(event._id)

        expect(eventInEnd.discussion[0].comments[0].content).toEqual('Okey, nice to know')
        expect(eventInEnd.discussion[0].comments[0].author.toString()).toEqual(user2._id)
    })

    it('should fail if requester not comment writer or creator', async () => {
        await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId + '/comments/' + commentId)
            .set('Cookie', user3Cookie)
            .expect(403)

        const eventInEnd = await Event.findById(event._id)

        expect(eventInEnd.discussion[0].comments[0].content).toEqual('Okey, nice to know')
        expect(eventInEnd.discussion[0].comments[0].author.toString()).toEqual(user2._id)
    })

    it('should fail if message not existing', async () => {
        await api
            .delete('/api/events/' + event._id + '/discussion/' + mongoose.Types.ObjectId() + '/comments/' + commentId)
            .set('Cookie', userCookie)
            .expect(400)
    })

    it('should fail if comment not existing', async () => {
        await api
            .delete('/api/events/' + event._id + '/discussion/' + messageId + '/comments/' + mongoose.Types.ObjectId())
            .set('Cookie', userCookie)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
    server.close()
})