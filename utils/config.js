if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let port = process.env.PORT
let mongodbUri = process.env.MONGODB_URI
let mongodbPort
let mongodbName
let baseUrl = process.env.BASE_URL

if (process.env.NODE_ENV === 'development') {
    port = process.env.DEVELOPMENT_PORT
    mongodbUri = process.env.DEVELOPMENT_MONGODB_URI
    baseUrl = process.env.DEVELOPMENT_BASE_URL
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

const emailUsername = process.env.EMAIL_USERNAME
const emailPassword = process.env.EMAIL_PASSWORD
const emailSender = process.env.EMAIL_SENDER

module.exports = {
    mongodbUri,
    port,
    mongodbPort,
    mongodbName,
    emailUsername,
    emailPassword,
    emailSender,
    baseUrl
}