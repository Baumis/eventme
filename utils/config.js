if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let port = process.env.PORT
let mongodbUri = process.env.MONGODB_URI

module.exports = {
    mongodbUri,
    port
}