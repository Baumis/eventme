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
            if (!component.data.title || !component.data.content) {
                return false
            }
            if (Object.keys(component.data).length > 2) {
                return false
            }
            if (!(component.data.title instanceof String) || !(component.data.content instanceof String)) {
                return false
            }
            if (component.data.title.length > 100 || component.data.content.length > 2000) {
                return false
            }
            return true
        case 'GUESTS':
            if (Object.keys(component.data).length !== 0) {
                return false
            }
            return true
        case 'INVITE_LINK':
            if (Object.keys(component.data).length === 1 && component.data.inviteKey) {
                if (component.data.inviteKey instanceof String && component.data.inviteKey.length < 100) {
                    return true
                }
                return false
            }
            if (Object.keys(component.data).length !== 0) {
                return false
            }
            return true
        case 'DISCUSSION':
            if (Object.keys(component.data).length !== 0) {
                return false
            }
            return true
        case 'PICTURE':
            if (component.data.url !== '' && !component.data.url) {
                return false
            }
            if (component.data.url.length > 1000) {
                return false
            }
            if (Object.keys(component.data).length !== 1) {
                return false
            }
            return true
        default:
            return false
    }
}