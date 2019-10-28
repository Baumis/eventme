const { MongoMemoryReplSet } = require('mongodb-memory-server')

module.exports = async () => {
    console.log('SETUP')
    const replSet = new MongoMemoryReplSet({
        instanceOpts: [
            {
                port: 3003,
            }
        ],
        replSet: {
            storageEngine: 'wiredTiger',
            dbName: 'test'
        }
    })
    await replSet.waitUntilRunning()
    const uri = await replSet.getConnectionString()
    console.log(uri)

    global.mongod = replSet
}