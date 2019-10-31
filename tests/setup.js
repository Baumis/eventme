const memoryDatabase = require('../utils/memoryDatabase')

module.exports = async () => {
    const replSet = await memoryDatabase.start()

    global.replSet = replSet
}