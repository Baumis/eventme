const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)


describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
})

describe('POST /api/user', () => {
    it('should create a new user', async () => {
        const res = await api
            .post('/api/users')
            .send({})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('name')
    })
})

afterAll(() => {
    mongoose.connection.close()
})