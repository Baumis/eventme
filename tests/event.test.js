const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../models/user')
const ActivityLog = require('../models/activityLog')
const Event = require('../models/event')
const testUtils = require('./testUtils')

const api = supertest(app)

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

    it.only('should require authentication', async () => {
        await api
            .post('/api/events')
            .expect(401)
    })
})

afterAll(() => {
    server.close()
})