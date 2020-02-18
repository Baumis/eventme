const cloudinary = require('cloudinary').v2

exports.upload = async (publicId, fileBuffer) => {
    const picture = await cloudinaryUploadStream(fileBuffer, { public_id: publicId, overwrite: true })
    return picture
}

exports.deleteAllByUser = async (userId) => {
    await cloudinary.api.delete_resources_by_prefix(`users/${userId}`)
}

exports.deleteAllByEvent = async (eventId) => {
    await cloudinary.api.delete_resources_by_prefix(`events/${eventId}`)
}

const cloudinaryUploadStream = async (fileBuffer, options) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        }).end(fileBuffer)
    })
}