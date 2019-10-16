const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../models/user')
const ActivityLog = require('../models/activityLog')
const Event = require('../models/event')
const testUtils = require('./testUtils')

const api = supertest(app)

const event = testUtils.event
const user = testUtils.user
let signedUser = null
let otherUser = null
let cookie = null

beforeAll(async () => {
    await User.deleteMany({})
    await Event.deleteMany({})
    await ActivityLog.deleteMany({})

    const res = await api
        .post('/api/users')
        .send(user)

    cookie = res
        .headers['set-cookie'][0]
        .split(',')
        .map(item => item.split(';')[0])
        .join(';')

    signedUser = res.body
    otherUser = await testUtils.addAndGetUser()
})

describe('POST /api/events', () => {

    it('should require authentication', async () => {
        await api
            .post('/api/events')
            .expect(401)
    })

    it('should succeed and create a new event with correct response', async () => {
        const res = await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(event)
            .expect(201)

        expect.stringContaining(res.body._id)
        expect.stringContaining(res.body.inviteKey)
        expect(res.body.label).toEqual(event.label)
        expect(new Date(res.body.startDate)).toEqual(event.startDate)
        expect(new Date(res.body.endDate)).toEqual(event.endDate)
        expect(res.body.creator._id).toEqual(signedUser._id)
        expect(res.body.guests[0].user._id).toEqual(signedUser._id)
        expect(res.body.guests[0].user.name).toEqual(signedUser.name)
        expect(res.body.guests[0].status).toEqual('GOING')
        expect.arrayContaining(res.body.guests)
        expect.arrayContaining(res.body.components)
        expect.stringContaining(res.body.background)
    })

    it('should succeed and be listed in users myEvents', async () => {
        const res = await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(event)
            .expect(201)

        const userInEnd = await User.findById(signedUser._id)

        expect(userInEnd.myEvents).toContainEqual(mongoose.Types.ObjectId(res.body._id))
    })

    it('should fail if label not given or not valid', async () => {
        const amountInBeginning = await Event.countDocuments()
        const userInBeginning = await User.findById(signedUser._id)

        const notValidEvent = {
            ...event,
            label: ''
        }

        const notValidEvent2 = {
            ...event,
            label: {
                label: 'fail'
            }
        }

        await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(notValidEvent)
            .expect(400)
        
        await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(notValidEvent2)
            .expect(400)

        const amountInEnd = await Event.countDocuments()
        const userInEnd = await User.findById(signedUser._id)

        expect(amountInBeginning).toEqual(amountInEnd)
        expect(userInBeginning.myEvents.length).toEqual(userInEnd.myEvents.length)
    })

    it('should fail if endDate is before startDate', async () => {
        const amountInBeginning = await Event.countDocuments()

        const notValidEvent = {
            ...event,
            startDate: new Date(Date.now() + 86400000),
            endDate: new Date()
        }

        await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(notValidEvent)
            .expect(400)

        const amountInEnd = await Event.countDocuments()

        expect(amountInBeginning).toEqual(amountInEnd)
    })

    it('should fail if components not valid', async () => {
        const amountInBeginning = await Event.countDocuments()

        const notValidEvent = {
            ...event,
            components: 'component'
        }
        const notValidEvent2 = {
            ...event,
            components: ['component']
        }
        const notValidEvent3 = {
            ...event,
            components: [
                {
                    type: 'NOT EXISTING',
                    data: ''
                }
            ]
        }

        await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(notValidEvent)
            .expect(400)

        await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(notValidEvent2)
            .expect(400)

        await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(notValidEvent3)
            .expect(400)

        const amountInEnd = await Event.countDocuments()

        expect(amountInBeginning).toEqual(amountInEnd)
    })

    it('should fail if background not valid', async () => {
        const amountInBeginning = await Event.countDocuments()

        const notValidEvent = {
            ...event,
            background: 'notvalidbackgroundurl'
        }

        await api
            .post('/api/events')
            .set('Cookie', cookie)
            .send(notValidEvent)
            .expect(400)

        const amountInEnd = await Event.countDocuments()

        expect(amountInBeginning).toEqual(amountInEnd)
    })
})

afterAll(() => {
    server.close()
})