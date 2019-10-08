const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../models/user')
const ActivityLog = require('../models/activityLog')

const api = supertest(app)

describe('POST /api/user', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await ActivityLog.deleteMany({})
    })

    it('should create a new valid user', async () => {
        const user = {
            username: 'johndoe',
            name: 'John Doe',
            password: 'secret',
            email: 'john.doe@test.com'
        }

        const res = await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect.stringContaining(res.body._id)
        expect(res.body.username).toEqual(user.username)
        expect(res.body.name).toEqual(user.name)
        expect(res.body.email).toEqual(user.email)
        expect(res.body.cover).toBeDefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
    })

    it('should require unique username', async () => {
        const user = {
            username: 'johndoe',
            name: 'John Doe',
            password: 'secret',
            email: 'john.doe@test.com'
        }

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
    beforeAll(async () => {
        await User.deleteMany({})
        const user = {
            username: 'johndoe',
            name: 'John Doe',
            password: 'secret',
            email: 'john.doe@test.com'
        }
        
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
        
        const res = await api
            .post('/api/login')
            .send({
                username: user.username,
                password: user.password
            })
            .expect(200)

        console.log(res.headers['set-cookie'])
    })

    it('should require authentication', async () => {
        await api
            .get('/api/users/asd')
            .expect(401)
    })
})

afterAll(() => {
    server.close()
})