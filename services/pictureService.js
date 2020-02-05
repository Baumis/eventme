const cloudinary = require('cloudinary').v2

exports.upload = async (publicId, fileBuffer) => {
    const picture = await cloudinaryUploadStream(fileBuffer, { public_id: publicId, overwrite: true })
    return picture
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