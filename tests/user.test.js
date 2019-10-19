const supertest = require('supertest')
const mongoose = require('mongoose')
const { app, server } = require('../index')
const User = require('../models/user')
const Event = require('../models/user')
const ActivityLog = require('../models/activityLog')
const testUtils = require('./testUtils')

const api = supertest(app)

const userObject = testUtils.userObject
const user2Object = testUtils.user2Object
const newUserObject = testUtils.newUserObject
let user = null
let user2 = null
let userCookie = null

beforeEach(async () => {
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

    user2 = res2.body
})

describe('POST /api/users', () => {

    it('should succeed and create a new user with correct response', async () => {
        const user3Object = testUtils.user3Object
        const amountInBeginning = await Event.countDocuments()

        const res = await api
            .post('/api/users')
            .send(user3Object)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const cookie = res
            .headers['set-cookie'][0]
            .split(',')
            .map(item => item.split(';')[0])
            .join(';')

        expect.stringContaining(res.body._id)
        expect(res.body.name).toEqual(user3Object.name)
        expect(res.body.email).toEqual(user3Object.email)
        expect(res.body.cover).toBeDefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
        expect(cookie).toBeDefined()

        const amountInEnd = await Event.countDocuments()
        expect(amountInBeginning + 1).toEqual(amountInEnd)
    })

    it('should succeed and create a new valid user', async () => {
        const user3Object = testUtils.user3Object
        const amountInBeginning = await Event.countDocuments()

        const res = await api
            .post('/api/users')
            .send(user3Object)

        const createdUser = await User.findById(res.body._id)

        expect(createdUser._id.toString()).toEqual(res.body._id)
        expect(createdUser.username).toEqual(user3Object.username)
        expect(createdUser.name).toEqual(user3Object.name)
        expect.stringContaining(createdUser.passwordHash)
        expect(createdUser.email).toEqual(user3Object.email)
        expect(createdUser.emailVerified).toBeFalsy()
        expect.arrayContaining(createdUser.myEvents)
        expect.arrayContaining(createdUser.myInvites)
        expect.stringContaining(createdUser.cover)
        expect(createdUser.userType).toEqual('LOCAL')

        const amountInEnd = await Event.countDocuments()
        expect(amountInBeginning + 1).toEqual(amountInEnd)
    })

    it('should fail if username taken', async () => {
        const user3Object = testUtils.user3Object
        const amountInBeginning = await Event.countDocuments()

        await api
            .post('/api/users')
            .send(user3Object)
            .expect(201)

        await api
            .post('/api/users')
            .send(user3Object)
            .expect(400)

        const amountInEnd = await Event.countDocuments()
        expect(amountInBeginning + 1).toEqual(amountInEnd)
    })

    it('should fail if username undefined', async () => {
        const notValidUser = {
            ...testUtils.user3Object,
            username: undefined
        }

        const amountInBeginning = await Event.countDocuments()

        await api
            .post('/api/users')
            .send(notValidUser)
            .expect(400)

        const amountInEnd = await Event.countDocuments()
        expect(amountInBeginning).toEqual(amountInEnd)
    })

    it('should fail if password too short', async () => {
        const notValidUser = {
            ...testUtils.user3Object,
            password: 'se'
        }

        const amountInBeginning = await Event.countDocuments()

        await api
            .post('/api/users')
            .send(notValidUser)
            .expect(400)

        const amountInEnd = await Event.countDocuments()
        expect(amountInBeginning).toEqual(amountInEnd)
    })
})

describe('GET /api/users/:id', () => {

    it('should fail if not authenticated', async () => {
        await api
            .get('/api/users/' + user._id)
            .expect(401)
    })

    it('should succeed with correct response when fetching own user', async () => {
        const res = await api
            .get('/api/users/' + user._id)
            .set('Cookie', userCookie)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body._id).toEqual(user._id)
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
            .get('/api/users/' + user2._id)
            .set('Cookie', userCookie)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body._id).toEqual(user2._id.toString())
        expect(res.body.username).toBeUndefined()
        expect(res.body.name).toEqual(user2.name)
        expect(res.body.passwordHash).toBeUndefined()
        expect(res.body.email).toBeUndefined()
        expect(res.body.emailVerified).toBeUndefined()
        expect.arrayContaining(res.body.myEvents)
        expect.arrayContaining(res.body.myInvites)
        expect.stringContaining(res.body.cover)
        expect(res.body.userType).toBeUndefined()
    })

    it('should fail if id not found', async () => {
        await api
            .get('/api/users/' + mongoose.Types.ObjectId())
            .set('Cookie', userCookie)
            .expect(400)
    })
})

describe('PUT /api/users/:id', () => {

    it('should fail if not authenticated', async () => {
        await api
            .put('/api/users/' + user._id)
            .expect(401)
    })

    it('should succeed and update user info', async () => {
        const res = await api
            .put('/api/users/' + user._id)
            .set('Cookie', userCookie)
            .send(newUserObject)
            .expect(200)

        expect(res.body._id.toString()).toEqual(user._id)
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
            .put('/api/users/' + user2._id)
            .set('Cookie', userCookie)
            .expect(403)
    })

    it('should fail if name undefined or too short', async () => {
        const notValidUser = {
            ...newUserObject,
            name: undefined
        }

        const notValidUser2 = {
            ...newUserObject,
            name: 'Ne'
        }

        await api
            .put('/api/users/' + user._id)
            .set('Cookie', userCookie)
            .send(notValidUser)
            .expect(400)

        await api
            .put('/api/users/' + user._id)
            .set('Cookie', userCookie)
            .send(notValidUser2)
            .expect(400)

        const userInEnd = await User.findById(user._id)

        expect(userInEnd._id.toString()).toEqual(user._id)
        expect(userInEnd.username).toEqual(userObject.username)
        expect(userInEnd.name).toEqual(user.name)
        expect(userInEnd.email).toEqual(user.email)
        expect(userInEnd.cover).toEqual(user.cover)
        expect(userInEnd.avatar).toEqual(user.avatar)
    })

    it('should fail if email undefined or not valid', async () => {
        const notValidUser = {
            ...newUserObject,
            email: undefined
        }

        const notValidUser2 = {
            ...newUserObject,
            email: 'new.emailmail.com'
        }

        await api
            .put('/api/users/' + user._id)
            .set('Cookie', userCookie)
            .send(notValidUser)
            .expect(400)

        await api
            .put('/api/users/' + user._id)
            .set('Cookie', userCookie)
            .send(notValidUser2)
            .expect(400)

        const userInEnd = await User.findById(user._id)

        expect(userInEnd._id.toString()).toEqual(user._id)
        expect(userInEnd.username).toEqual(userObject.username)
        expect(userInEnd.name).toEqual(user.name)
        expect(userInEnd.email).toEqual(user.email)
        expect(userInEnd.cover).toEqual(user.cover)
        expect(userInEnd.avatar).toEqual(user.avatar)
    })
})

describe('DELETE /api/users/:id', () => {

    it('should fail if not authenticated', async () => {
        const amountInBeginning = await User.countDocuments()

        await api
            .delete('/api/users/' + user._id)
            .expect(401)

        const amountInEnd = await User.countDocuments()
        expect(amountInBeginning).toEqual(amountInEnd)
    })

    it('should succeed and remove user', async () => {
        const amountInBeginning = await User.countDocuments()

        await api
            .delete('/api/users/' + user._id)
            .set('Cookie', userCookie)
            .expect(204)

        const amountInEnd = await User.countDocuments()
        expect(amountInBeginning - 1).toEqual(amountInEnd)
    })

    it('should fail if trying to remove someone elses user', async () => {
        const amountInBeginning = await User.countDocuments()

        await api
            .delete('/api/users/' + user2._id)
            .set('Cookie', userCookie)
            .expect(403)

        const amountInEnd = await User.countDocuments()
        expect(amountInBeginning).toEqual(amountInEnd)
    })
})

afterAll(() => {
    server.close()
})