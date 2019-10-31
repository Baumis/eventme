if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let port = process.env.PORT
let mongodbUri = process.env.MONGODB_URI
let mongodbPort
let mongodbName

if (process.env.NODE_ENV === 'development') {
    port = process.env.DEVELOPMENT_PORT
    mongodbUri = process.env.DEVELOPMENT_MONGODB_URI
} else if (process.env.NODE_ENV === 'test') {
    port = process.env.TEST_PORT
    mongodbUri = process.env.TEST_MONGODB_URI
    mongodbPort = process.env.TEST_MONGODB_PORT
    mongodbName = process.env.TEST_MONGODB_NAME
} else if (process.env.NODE_ENV === 'local') {
    port = process.env.LOCAL_PORT
    mongodbUri = process.env.LOCAL_MONGODB_URI
    mongodbPort = process.env.LOCAL_MONGODB_PORT
    mongodbName = process.env.LOCAL_MONGODB_NAME
}

module.exports = {
    mongodbUri,
    port,
    mongodbPort,
    mongodbName
}