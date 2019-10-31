const app = require('./app')
const mongoose = require('mongoose')
const config = require('./utils/config')

// Server Initialization
const main = async () => {
    let replSet

    if (process.env.NODE_ENV === 'local') {
        const memoryDatabase = require('./utils/memoryDatabase')
        replSet = await memoryDatabase.start()
    }

    await mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })

    // Start up the server on the port specified
    app.listen(config.port, () => {
        console.log('Listening on port', config.port)
    })

    app.on('close', async () => {
        await mongoose.connection.close()
        if (process.env.NODE_ENV === 'local') {
            await replSet.stop()
        }
    })
}

main()