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
    const registrations = event.registrations.filter(registration => {
        if (registration.user) {
            if (registration.user.toString() !== message.author._id.toString()) {
                return true
            }
            return false
        }
    })
    const guestIds = registrations.map(registration => registration.user)
    const guestsWithVerifiedEmail = await User.find({ _id: { $in: guestIds }, emailVerified: true })
    const emails = guestsWithVerifiedEmail.map(guest => guest.email)
    const content = `
            <h2 style="color:#0e0e0f;">New message in ${event.label} discussion</h2>
            <p style="color:#19a45e; margin-bottom: 0px;">From</p>
            <p style="color:#62646a; margin-top: 3px;">${message.author.name}</p>
            <p style="color:#19a45e; margin-bottom: 0px;">Message</p>
            <p style="color:#62646a; margin-top: 3px;">${message.content}</p>
            <p style="color:#19a45e; margin-bottom: 0px;">Go to event</p>
            <a style="margin-top: 3px;" href="${config.baseUrl}/events/${event._id}${event.urlmodifier}">${config.baseUrl}/events/${event._id}${event.urlmodifier}</a>
    `

    await this.sendSeparatedMails(emails, event.label, template(content))
}

exports.sendEmailVerification = async (user) => {
    const emailVerificationToken = User.generateEmailVerificationToken(user)

    const verificationUrl = `${config.baseUrl}/profile/${user._id}/verify/${emailVerificationToken}`

    const content = `
        <h2 style="color:#0e0e0f;">Email verification</h2>
        <p style="color:#19a45e; margin-bottom: 0px;">Verify by clicking the link</p>
        <a style="margin-top: 3px;" href="${verificationUrl}">${verificationUrl}</a>
    `

    await this.sendMail(user.email, 'Please verify your email', template(content))
}

exports.sendNewPassword = async (user, newPassword) => {
    const content = `
        <h2 style="color:#0e0e0f;">A new password for your account has been requested</h2>
        <p style="color:#19a45e; margin-bottom: 0px;">New password</p>
        <p style="color:#62646a; margin-top: 3px;">${newPassword}</p>
        <p style="color:#19a45e; margin-bottom: 0px;">PS</p>
        <p style="color:#62646a; margin-top: 3px;">Remember to change the password in your profile</p>
    `

    await this.sendMail(user.email, 'Password reseted', template(content))
}

template = (content) => {
    return `
    <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet'>
    <div style="display:flex; background:#f7f7f8; font-family:'raleway',sans-serif;">
        <div style="background:white; padding:20px; margin:20px; flex:1; border-radius:5px; width: 100%;">
            <div style="display: flex; align-items: center;">
                <img style="height: 32px;" src="https://www.inviteowl.com/owl_200x200_green.ico">
                <div style="color:#19a45e; font-size: 19px; margin-top: 5px;">InviteOwl</div>
            </div>
            ${content}
        </div>
    </div>
    `
}