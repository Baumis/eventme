const nodemailer = require('nodemailer')
const config = require('../utils/config')
const User = require('../models/user')

exports.sendMail = async (to, subject, html) => {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'local') {
        return
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailUsername,
            pass: config.emailPassword
        }
    })

    const mailOptions = {
        from: config.emailSender,
        to,
        subject,
        html
    }

    return await transporter.sendMail(mailOptions)
}

exports.sendSeparatedMails = async (emails, subject, html) => {
    const emailPromises = []
    for (let email of emails) {
        const emailPromise = this.sendMail(email, subject, html)
        emailPromises.push(emailPromise)
    }
    return await Promise.all(emailPromises)
}

exports.notifyAboutNewMessage = async (message, event) => {
    const guestIds = event.guests
        .map(guest => guest.user)
        .filter(guestId => guestId.toString() !== message.author._id.toString())

    const guestsWithVerifiedEmail = await User.find({ _id: { $in: guestIds }, emailVerified: true })

    const emails = guestsWithVerifiedEmail.map(guest => guest.email)

    const content = `
        <h3>New message in ${event.label} discussion</h3>
        <p><b>From: </b>${message.author.name}</p>
        <p><b>Message: </b>${message.content}</p>
        <a href="${config.baseUrl}/events/${event._id}">Go to ${event.label}</a>
    `

    await this.sendSeparatedMails(emails, event.label, content)
}

exports.sendEmailVerification = async (user) => {
    const emailVerificationToken = User.generateEmailVerificationToken(user)

    const verificationUrl = `${config.baseUrl}/profile/${user._id}/verify/${emailVerificationToken}`

    const content = `
        <h3>Click the link to verify your email</h3>
        <a href="${verificationUrl}">Verify email</a>
    `

    await this.sendMail(user.email, 'Please verify your email', content)
}

exports.sendNewPassword = async (user, newPassword) => {
    const content = `
        <h3>Your new password</h3>
        <p>${newPassword}</p>
        <p>Remember to change the password in your profile</p>
    `

    await this.sendMail(user.email, 'Password reseted', content)
}