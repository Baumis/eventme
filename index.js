const app = require('./app')
const mongoose = require('mongoose')
const config = require('./utils/config')
const mongodbUri = config.mongodbUri
const port = config.port

// Server Initialization
const main = async () => {
    await mongoose.connect(mongodbUri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })

    // Start up the server on the port specified
    app.listen(port)
}

main()