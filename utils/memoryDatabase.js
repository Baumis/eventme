const { MongoMemoryReplSet } = require('mongodb-memory-server')
const config = require('../utils/config')

exports.start = async () => {
    const replSet = new MongoMemoryReplSet({
        instanceOpts: [
            {
                port: Number(config.mongodbPort),
            }
        ],
        replSet: {
            storageEngine: 'wiredTiger',
            dbName: config.mongodbName
        }
    })

    await replSet.waitUntilRunning()

    return replSet
}