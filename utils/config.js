if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let port = process.env.PORT
let mongodbUri = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
    port = process.env.TEST_PORT
    mongodbUri = process.env.TEST_MONGODB_URI
}

module.exports = {
    mongodbUri,
    port
}