const mongoose = require('mongoose')

exports.validateDate = (date) => {
    if (!date) {
        return false
    }

    if (!(date instanceof Date)) {
        return false
    }

    return true
}

exports.validateDates = (startDate, endDate) => {
    if (!this.validateDate(startDate) || !this.validateDate(endDate)) {
        return false
    }

    if (startDate > endDate) {
        return false
    }

    return true
}

exports.validateComponents = (components) => {
    for (let component of components) {
        const valid = this.validateComponent(component)

        if (!valid) {
            return false
        }
    }

    return true
}

exports.validateComponent = (component) => {
    if (!component || !component.type) {
        return false
    }

    if (!component.data) {
        component.data = {}
    }

    switch(component.type) {
        case 'TEXT':
            if (Object.keys(component.data).length > 2) {
                return false
            }
            if (!(typeof component.data.title === 'string') || !(typeof component.data.content === 'string')) {
                return false
            }
            if (component.data.title.length > 100 || component.data.content.length > 2000) {
                return false
            }
            return true
        case 'INVITE_LINK':
            if (Object.keys(component.data).length === 1 && component.data.inviteKey) {
                if (typeof component.data.inviteKey === 'string' && component.data.inviteKey.length < 100) {
                    return true
                }
                return false
            }
            if (Object.keys(component.data).length !== 0) {
                return false
            }
            return true
        case 'PICTURE':
            if (component.data.url !== '' && !component.data.url) {
                return false
            }
            if (!component.data.url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
                return false
            }
            if (component.data.url.length > 1000) {
                return false
            }
            if ((typeof component.data.expand !== 'boolean')) {
                return false
            }
            if (Object.keys(component.data).length !== 2) {
                return false
            }
            return true
        default:
            return false
    }
}

exports.validateTextData = async (data) => {
    if ((typeof data.title !== 'string') || (typeof data.content !== 'string')) {
        return false
    }
    if (data.title.length > 100 || data.content.length > 2000) {
        return false
    }
    return true
}

exports.validatePictureData = async (data) => {
    if ((typeof data.expand !== 'boolean') || (typeof data.url !== 'string')) {
        return false
    }
    if (!data.url.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
        return false
    }
    if (data.url.length > 1000) {
        return false
    }
    return true
}

exports.validateVoteData = async (data) => {
    if (!Array.isArray(data.options) || (typeof data.subject !== 'string')) {
        return false
    }
    if (data.options.length > 10 || data.subject.length > 100) {
        return false
    }
    return true

}

exports.validateVoteOptionLabel = async (label) => {
    if (typeof label !== 'string') {
        return false
    }
    if (label.length > 100) {
        return false
    }
    return true
}

exports.validatePosition = async (position) => {
    if (typeof position === 'number') {
        return false
    }
    if (position > 100) {
        return false
    }
    return true
}