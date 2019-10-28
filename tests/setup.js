const { MongoMemoryReplSet } = require('mongodb-memory-server')

module.exports = async () => {
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

    global.replSet = replSet
}