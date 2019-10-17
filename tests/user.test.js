const supertest = require('supertest')
const { app, server } = require('../index')
const User = require('../models/user')
const ActivityLog = require('../models/activityLog')
const testUtils = require('./testUtils')

const api = supertest(app)

describe('POST /api/users', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await ActivityLog.deleteMany({})
    })

    it('should succeed and create a new user with correct response', async () => {
        const userObject = testUtils.userObject

        const res = await api
            .post('/api/users')
            .send(userObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const cookie = res
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';')

        expect.stringContaining(res.body._id)
        expect(res.body.name).toEqual(userObject.name)
        expect(res.body.email).toEqual(userObject.email)
        expect(res.body.cover).toBeDefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
        expect(cookie).toBeDefined()

        const amountOfUsers = await User.countDocuments()
        expect(amountOfUsers).toEqual(1)
    })

    it('should succeed and create a new valid user', async () => {
        const userObject = testUtils.userObject

        const res = await api
            .post('/api/users')
            .send(userObject)

        const createdUser = await User.findById(res.body._id)

        expect(createdUser._id.toString()).toEqual(res.body._id)
        expect(createdUser.username).toEqual(userObject.username)
        expect(createdUser.name).toEqual(userObject.name)
        expect.stringContaining(createdUser.passwordHash)
        expect(createdUser.email).toEqual(userObject.email)
        expect(createdUser.emailVerified).toBeFalsy()
        expect.arrayContaining(createdUser.myEvents)
        expect.arrayContaining(createdUser.myInvites)
        expect.stringContaining(createdUser.cover)
        expect(createdUser.userType).toEqual('LOCAL')

        const amountOfUsers = await User.countDocuments()
        expect(amountOfUsers).toEqual(1)
    })

    it('should fail if username taken', async () => {
        const userObject = testUtils.userObject

        await api
            .post('/api/users')
            .send(userObject)
            .expect(201)

        await api
            .post('/api/users')
            .send(userObject)
            .expect(400)
        
        const amountOfUsers = await User.countDocuments()
        expect(amountOfUsers).toEqual(1)
    })

    it('should fail if username undefined', async () => {
        const userObject = {
            ...testUtils.userObject,
            username: undefined
        }

        await api
            .post('/api/users')
            .send(userObject)
            .expect(400)

        const amountOfUsers = await User.countDocuments()
        expect(amountOfUsers).toEqual(0)
    })

    it('should fail if password too short', async () => {
        const userObject = {
            ...testUtils.userObject,
            password: 'se'
        }

        await api
            .post('/api/users')
            .send(userObject)
            .expect(400)
        
        const amountOfUsers = await User.countDocuments()
        expect(amountOfUsers).toEqual(0)
    })
})

describe('GET /api/users/:id', () => {
    const userObject = testUtils.userObject
    let signedUser = null
    let otherUser = null
    let cookie = null

    beforeAll(async () => {
        await User.deleteMany({})
        await ActivityLog.deleteMany({})

        const res = await api
            .post('/api/users')
            .send(userObject)

        cookie = res
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';')
        
        signedUser = res.body
        otherUser = await testUtils.addAndGetUser()
    })

    it('should require authentication', async () => {
        await api
            .get('/api/users/' + signedUser._id)
            .expect(401)
    })

    it('should succeed with correct response when fetching own user', async () => {
        const res = await api
            .get('/api/users/' + signedUser._id)
            .set('Cookie', cookie)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body._id).toEqual(signedUser._id)
        expect(res.body.username).toEqual(userObject.username)
        expect(res.body.name).toEqual(userObject.name)
        expect(res.body.passwordHash).toBeUndefined()
        expect(res.body.email).toEqual(userObject.email)
        expect(res.body.emailVerified).toBeUndefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
        expect.stringContaining(res.body.cover)
        expect(res.body.userType).toBeUndefined()
    })

    it('should succeed with correct response when fetching someone elses user', async () => {
        const res = await api
            .get('/api/users/' + otherUser._id)
            .set('Cookie', cookie)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body._id).toEqual(otherUser._id.toString())
        expect(res.body.username).toBeUndefined()
        expect(res.body.name).toEqual(otherUser.name)
        expect(res.body.passwordHash).toBeUndefined()
        expect(res.body.email).toBeUndefined()
        expect(res.body.emailVerified).toBeUndefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
        expect.stringContaining(res.body.cover)
        expect(res.body.userType).toBeUndefined()
    })

    it('should fail if id not found', async () => {
        const nonExistingUserId = await testUtils.nonExistingUserId()

        await api
            .get('/api/users/' + nonExistingUserId)
            .set('Cookie', cookie)
            .expect(400)
    })
})

describe('PUT /api/users/:id', () => {
    const userObject = testUtils.userObject
    let signedUser = null
    let otherUser = null
    let cookie = null

    beforeAll(async () => {
        await User.deleteMany({})
        await ActivityLog.deleteMany({})

        const res = await api
            .post('/api/users')
            .send(userObject)

        cookie = res
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';')
        
        signedUser = res.body
        otherUser = await testUtils.addAndGetUser()
    })

    it('should require authentication', async () => {
        await api
            .put('/api/users/' + signedUser._id)
            .expect(401)
    })

    it('should succeed and update user info', async () => {
        const newUserObject = {
            name: 'New name',
            email: 'new.email@mail.com',
            avatar: 'www.picture.com/avatarjpg',
            cover: 'www.picture.com/coverjpg'
        }

        const res = await api
            .put('/api/users/' + signedUser._id)
            .set('Cookie', cookie)
            .send(newUserObject)
            .expect(200)
        
        expect(res.body._id.toString()).toEqual(signedUser._id)
        expect(res.body.username).toEqual(userObject.username)
        expect(res.body.name).toEqual(newUserObject.name)
        expect(res.body.passwordHash).toBeUndefined()
        expect(res.body.email).toEqual(newUserObject.email)
        expect(res.body.emailVerified).toBeUndefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
        expect(res.body.cover).toEqual(newUserObject.cover)
        expect(res.body.avatar).toEqual(newUserObject.avatar)
        expect(res.body.userType).toBeUndefined()
    })

    it('should fail if trying to update someone elses user', async () => {
        await api
            .put('/api/users/' + otherUser._id)
            .set('Cookie', cookie)
            .expect(403)
    })

    it('should fail if name undefined or too short', async () => {
        const userInBeginning = await User.findById(signedUser._id)

        const newUserObject = {
            email: 'new.email@mail.com',
            avatar: 'www.picture.com/avatarjpg',
            cover: 'www.picture.com/coverjpg'
        }

        const newUserObject2 = {
            name: 'Ne',
            email: 'new.email@mail.com',
            avatar: 'www.picture.com/avatarjpg',
            cover: 'www.picture.com/coverjpg'
        }

        await api
            .put('/api/users/' + signedUser._id)
            .set('Cookie', cookie)
            .send(newUserObject)
            .expect(400)
        
        await api
            .put('/api/users/' + signedUser._id)
            .set('Cookie', cookie)
            .send(newUserObject2)
            .expect(400)
        
        const userInEnd = await User.findById(signedUser._id)

        expect(userInBeginning).toEqual(userInEnd)
    })

    it('should fail if email undefined or not valid', async () => {
        const userInBeginning = await User.findById(signedUser._id)

        const newUserObject = {
            name: 'Wrong email',
            avatar: 'www.picture.net/avatarjpg',
            cover: 'www.picture.net/coverjpg'
        }

        const newUserObject2 = {
            name: 'Wrong email',
            email: 'new.emailmail.com',
            avatar: 'www.picture.fi/avatarjpg',
            cover: 'www.picture.fi/coverjpg'
        }

        await api
            .put('/api/users/' + signedUser._id)
            .set('Cookie', cookie)
            .send(newUserObject)
            .expect(400)
        
        await api
            .put('/api/users/' + signedUser._id)
            .set('Cookie', cookie)
            .send(newUserObject2)
            .expect(400)
        
        const userInEnd = await User.findById(signedUser._id)

        expect(userInBeginning).toEqual(userInEnd)
    })
})

describe('DELETE /api/users/:id', () => {
    const userObject = testUtils.userObject
    let signedUser = null
    let otherUser = null
    let cookie = null

    beforeEach(async () => {
        await User.deleteMany({})
        await ActivityLog.deleteMany({})

        const res = await api
            .post('/api/users')
            .send(userObject)

        cookie = res
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';')
        
        signedUser = res.body
        otherUser = await testUtils.addAndGetUser()
    })

    it('should require authentication', async () => {
        await api
            .delete('/api/users/' + signedUser._id)
            .expect(401)
        
        const amountOfUsers = await User.countDocuments()

        expect(amountOfUsers).toEqual(2)
    })

    it('should succeed and remove user', async () => {
        await api
            .delete('/api/users/' + signedUser._id)
            .set('Cookie', cookie)
            .expect(204)
        
        const amountOfUsers = await User.countDocuments()

        expect(amountOfUsers).toEqual(1)
    })

    it('should fail if trying to remove someone elses user', async () => {
        await api
            .delete('/api/users/' + otherUser._id)
            .set('Cookie', cookie)
            .expect(403)
        
        const amountOfUsers = await User.countDocuments()

        expect(amountOfUsers).toEqual(2)
    })
})

afterAll(() => {
    server.close()
})