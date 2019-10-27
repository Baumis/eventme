const { MongoMemoryServer } = require('mongodb-memory-server')

module.exports = async () => {
    console.log('SETUP')
    const mongod = new MongoMemoryServer({
        instance: {
            port: 3003,
            dbName: 'test'
        }
    })

    global.mongod = mongod
}