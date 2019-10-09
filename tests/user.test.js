const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../models/user')
const ActivityLog = require('../models/activityLog')
const testUtils = require('../utils/testUtils')

const api = supertest(app)

describe('POST /api/user', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await ActivityLog.deleteMany({})
    })

    it('should create a new user with correct response', async () => {
        const user = testUtils.user

        const res = await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const cookie = res
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';')

        expect.stringContaining(res.body._id)
        expect(res.body.name).toEqual(user.name)
        expect(res.body.email).toEqual(user.email)
        expect(res.body.cover).toBeDefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
        expect(cookie).toBeDefined()
    })

    it('should create a new valid user', async () => {
        const user = testUtils.user

        const res = await api
            .post('/api/users')
            .send(user)

        const createdUser = await User.findById(res.body._id)

        expect(createdUser._id.toString()).toEqual(res.body._id)
        expect(createdUser.username).toEqual(user.username)
        expect(createdUser.name).toEqual(user.name)
        expect.stringContaining(createdUser.passwordHash)
        expect(createdUser.email).toEqual(user.email)
        expect(createdUser.emailVerified).toBeFalsy()
        expect.arrayContaining(createdUser.myEvents)
        expect.arrayContaining(createdUser.myInvites)
        expect.stringContaining(createdUser.cover)
        expect(createdUser.userType).toEqual('LOCAL')
    })

    it('should require unique username', async () => {
        const user = testUtils.user

        await api
            .post('/api/users')
            .send(user)
            .expect(201)

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })

    it('should require defined username', async () => {
        const user = {
            name: 'John Doe',
            password: 'secret',
            email: 'john.doe@test.com'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })

    it('should require password length to be at least 3', async () => {
        const user = {
            username: 'johndoe',
            name: 'John Doe',
            password: 'se',
            email: 'john.doe@test.com'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })
})

describe('GET /api/user/:id', () => {
    const user = testUtils.user
    let signedUser = null
    let cookie = null

    beforeAll(async () => {
        await User.deleteMany({})

        const res = await api
            .post('/api/users')
            .send(user)

        cookie = res
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';')
        
        signedUser = res.body
    })

    it('should require authentication', async () => {
        await api
            .get('/api/users/' + signedUser._id)
            .expect(401)
    })

    it('should succeed with correct response when authenticated', async () => {
        const res = await api
            .get('/api/users/' + signedUser._id)
            .set('Cookie', cookie)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body._id.toString()).toEqual(signedUser._id)
        expect(res.body.username).toEqual(user.username)
        expect(res.body.name).toEqual(user.name)
        expect(res.body.passwordHash).toBeUndefined()
        expect(res.body.email).toEqual(user.email)
        expect(res.body.emailVerified).toBeUndefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
        expect.stringContaining(res.body.cover)
        expect(res.body.userType).toBeUndefined()
    })
})

afterAll(() => {
    server.close()
})