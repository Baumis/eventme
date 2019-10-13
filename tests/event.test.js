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
})

afterAll(() => {
    server.close()
})