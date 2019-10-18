const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../models/user')
const ActivityLog = require('../models/activityLog')
const Event = require('../models/event')
const testUtils = require('./testUtils')

const api = supertest(app)

const eventObject = testUtils.eventObject
const newEventObject = testUtils.newEventObject
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
    await User.deleteMany({})
    await Event.deleteMany({})
    await ActivityLog.deleteMany({})

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
})

describe('POST /api/events', () => {

    it('should fail if not authenticated', async () => {
        await api
            .post('/api/events')
            .expect(401)
    })

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
        expect.stringContaining(res.body.inviteKey)
        expect(res.body.label).toEqual(eventObject.label)
        expect(new Date(res.body.startDate)).toEqual(eventObject.startDate)
        expect(new Date(res.body.endDate)).toEqual(eventObject.endDate)
        expect(res.body.creator._id).toEqual(user._id)
        expect(res.body.guests[0].user._id).toEqual(user._id)
        expect(res.body.guests[0].user.name).toEqual(user.name)
        expect(res.body.guests[0].status).toEqual('GOING')
        expect.arrayContaining(res.body.guests)
        expect.arrayContaining(res.body.components)
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

    it('should fail if endDate is before startDate', async () => {
        const amountInBeginning = await Event.countDocuments()

        const notValidEvent = {
            ...eventObject,
            startDate: new Date(Date.now() + 86400000),
            endDate: new Date()
        }

        await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(notValidEvent)
            .expect(400)

        const amountInEnd = await Event.countDocuments()

        expect(amountInBeginning).toEqual(amountInEnd)
    })

    it('should fail if components not valid', async () => {
        const amountInBeginning = await Event.countDocuments()

        const notValidEvent = {
            ...eventObject,
            components: [
                {
                    type: 'NOT EXISTING',
                    data: ''
                }
            ]
        }

        await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(notValidEvent)
            .expect(400)

        const amountInEnd = await Event.countDocuments()

        expect(amountInBeginning).toEqual(amountInEnd)
    })

    it('should fail if background not valid', async () => {
        const amountInBeginning = await Event.countDocuments()

        const notValidEvent = {
            ...eventObject,
            background: 'notvalidbackgroundurl'
        }

        await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(notValidEvent)
            .expect(400)

        const amountInEnd = await Event.countDocuments()

        expect(amountInBeginning).toEqual(amountInEnd)
    })
})

describe('GET /api/events/:id', () => {

    let createdEvent = null

    beforeAll(async () => {
        await Event.deleteMany({})

        const res = await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(eventObject)

        eventId = res.body._id

        const res2 = await api
            .post('/api/events/' + eventId + '/guests')
            .set('Cookie', userCookie)
            .send({ userId: user2._id })

        createdEvent = res2.body
    })

    it('should fail if not authenticated', async () => {
        await api
            .get('/api/events/' + createdEvent._id)
            .expect(401)
    })

    it('should succeed and return correct event to creator', async () => {
        const res = await api
            .get('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .expect(200)

        expect(res.body._id).toEqual(createdEvent._id)
        expect(res.body.label).toEqual(createdEvent.label)
        expect(res.body.inviteKey).toEqual(createdEvent.inviteKey)
        expect(res.body.startDate).toEqual(createdEvent.startDate)
        expect(res.body.endDate).toEqual(createdEvent.endDate)
        expect(res.body.creator).toEqual(createdEvent.creator)
        expect(res.body.guests).toEqual(createdEvent.guests)
        expect(res.body.components).toEqual(createdEvent.components)
        expect(res.body.background).toEqual(createdEvent.background)
        expect(res.body.discussion).toEqual(createdEvent.discussion)
    })

    it('should succeed and return correct event to guest', async () => {
        const res = await api
            .get('/api/events/' + createdEvent._id)
            .set('Cookie', user2Cookie)
            .expect(200)

        expect(res.body._id).toEqual(createdEvent._id)
        expect(res.body.label).toEqual(createdEvent.label)
        expect(res.body.startDate).toEqual(createdEvent.startDate)
        expect(res.body.endDate).toEqual(createdEvent.endDate)
        expect(res.body.creator).toEqual(createdEvent.creator)
        expect(res.body.guests).toEqual(createdEvent.guests)
        expect(res.body.components).toEqual(createdEvent.components)
        expect(res.body.background).toEqual(createdEvent.background)
        expect(res.body.discussion).toEqual(createdEvent.discussion)
    })

    it('should fail if authenticated but not creator or guest', async () => {
        await api
            .get('/api/events/' + createdEvent._id)
            .set('Cookie', user3Cookie)
            .expect(403)
    })

    it('should fail if event not existing', async () => {
        await api
            .get('/api/events/' + mongoose.Types.ObjectId())
            .set('Cookie', userCookie)
            .expect(404)
    })
})

describe('PUT /api/events/:id', () => {

    let createdEvent = null

    beforeAll(async () => {
        await Event.deleteMany({})

        const res = await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(eventObject)

        createdEvent = res.body
    })

    it('should fail if not authenticated', async () => {
        await api
            .put('/api/events/' + createdEvent._id)
            .expect(401)
    })

    it('should succeed and update event with correct response', async () => {
        const res = await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(newEventObject)
            .expect(200)

        expect(res.body._id).toEqual(createdEvent._id)
        expect(res.body.label).toEqual(newEventObject.label)
        expect(res.body.inviteKey).toEqual(createdEvent.inviteKey)
        expect(new Date(res.body.startDate)).toEqual(newEventObject.startDate)
        expect(new Date(res.body.endDate)).toEqual(newEventObject.endDate)
        expect(res.body.creator).toEqual(createdEvent.creator)
        expect(res.body.guests).toEqual(createdEvent.guests)
        expect(res.body.components[0]).toEqual(newEventObject.components[0])
        expect(res.body.components[1].type).toEqual(newEventObject.components[1].type)
        expect(res.body.components[2].type).toEqual(newEventObject.components[2].type)
        expect(res.body.components[2].data.inviteKey).toEqual(createdEvent.inviteKey)
        expect(res.body.components[3]).toEqual(newEventObject.components[3])
        expect(res.body.background).toEqual(newEventObject.background)
    })

    it('should fail if label too short', async () => {
        const notValidEventObject = {
            ...newEventObject,
            label: ''
        }

        await api
            .put('/api/events/' + createdEvent._id)
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
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if endDate not valid', async () => {
        const notValidEventObject = {
            ...newEventObject,
            endDate: {
                date: 'not a date'
            }
        }

        await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if background not valid', async () => {
        const notValidEventObject = {
            ...newEventObject,
            background: 'www'
        }

        await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if endDate is before startDate', async () => {
        const notValidEventObject = {
            ...newEventObject,
            startDate: new Date(Date.now() + 86400000),
            endDate: new Date()
        }

        await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if non existing component is provided', async () => {
        const notValidEventObject = {
            ...newEventObject,
            components: [
                {
                    type: 'NOT_EXISTING',
                    data: {}
                }
            ]
        }

        await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if TEXT component not valid', async () => {
        const notValidEventObject = {
            ...newEventObject,
            components: [
                {
                    type: 'TEXT',
                    data: {}
                }
            ]
        }

        await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if GUESTS component not valid', async () => {
        const notValidEventObject = {
            ...newEventObject,
            components: [
                {
                    type: 'GUESTS',
                    data: {
                        extra: 'some hidden data'
                    }
                }
            ]
        }

        await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if INVITE_LINK component not valid', async () => {
        const notValidEventObject = {
            ...newEventObject,
            components: [
                {
                    type: 'INVITE_LINK',
                    data: {
                        text: 'this is the link'
                    }
                }
            ]
        }

        await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })

    it('should fail if PICTURE component not valid', async () => {
        const notValidEventObject = {
            ...newEventObject,
            components: [
                {
                    type: 'PICTURE',
                    data: {
                        url: 'not a url',
                        extended: false
                    }
                }
            ]
        }

        await api
            .put('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .send(notValidEventObject)
            .expect(400)
    })
})

describe('DELETE /api/events/:id', () => {
    let createdEvent = null

    beforeEach(async () => {
        await Event.deleteMany({})

        const res = await api
            .post('/api/events')
            .set('Cookie', userCookie)
            .send(eventObject)

        createdEvent = res.body
    })

    it('should succeed with correct response', async () => {
        const amountInBeginning = await Event.countDocuments()
        await api
            .delete('/api/events/' + createdEvent._id)
            .set('Cookie', userCookie)
            .expect(204)

        const amountInEnd = await Event.countDocuments()
        const userInEnd = await User.findById(user._id)

        expect(amountInBeginning - 1).toEqual(amountInEnd)
        expect(userInEnd.myEvents).not.toContainEqual(mongoose.Types.ObjectId(createdEvent._id))
    })

    it('should fail if not authenticated', async () => {
        await api
            .delete('/api/events/' + createdEvent._id)
            .expect(401)
    })

    it('should fail if trying to remove someone elses event', async () => {
        await api
            .delete('/api/events/' + createdEvent._id)
            .set('Cookie', user2Cookie)
            .expect(403)
    })
})

afterAll(() => {
    server.close()
})