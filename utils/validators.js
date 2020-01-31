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
        case 'PICTURE':
            if (typeof component.data.url !== 'string') {
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

exports.validateTextData = (data) => {
    if ((typeof data.title !== 'string') || (typeof data.content !== 'string')) {
        return false
    }
    if (data.title.length > 100 || data.content.length > 2000) {
        return false
    }
    if (Object.keys(data).length !== 2) {
        return false
    }
    return true
}

exports.validatePictureData = (data) => {
    if ((typeof data.expand !== 'boolean') || (typeof data.url !== 'string')) {
        return false
    }
    if (data.url.length > 1000) {
        return false
    }
    if (Object.keys(data).length !== 2) {
        return false
    }
    return true
}

exports.validateVoteData = (data) => {
    if (!Array.isArray(data.options) || (typeof data.subject !== 'string')) {
        return false
    }
    if (data.options.length > 10 || data.subject.length > 100) {
        return false
    }
    if (Object.keys(data).length !== 2) {
        return false
    }
    return true
}

exports.validateFormData = (data) => {
    if (!Array.isArray(data.questions)) {
        return false
    }
    if (data.questions.length > 10) {
        return false
    }
    if (Object.keys(data).length !== 1) {
        return false
    }
    return true
}

exports.validateVoteOptions = (options) => {
    for (let option of options) {
        if(!this.validateLabel(option.label)) {
            return false
        }
        if (!Array.isArray(option.votes)) {
            return false
        }
    }
    return true
}

exports.validateLabel = (label) => {
    if (typeof label !== 'string') {
        return false
    }
    if (label.length > 100) {
        return false
    }
    return true
}

exports.validateFormQuestions = (questions) => {
    for (let question of questions) {
        if(!this.validateLabel(question.label)) {
            return false
        }
        if (!Array.isArray(question.answers)) {
            return false
        }
    }
    return true
}

exports.validateAnswers = (answers) => {
    for (let answer of answers) {
        if ((typeof answer.question !== 'string') || (typeof answer.content !== 'string')) {
            return false
        }
        if (answer.content.length > 200) {
            return false
        }
    }
    return true
}

exports.validateRegistrationQuestions = (registrationQuestions) => {
    for (let question of registrationQuestions) {
        const valid = this.validateRegistrationQuestion(question)

        if (!valid) {
            return false
        }
    }
    return true
}

exports.validateRegistrationQuestion = (registrationQuestion) => {
    switch(registrationQuestion.type) {
        case 'QUESTION':
            if (Object.keys(registrationQuestion.data).length > 2) {
                return false
            }
            if (!(typeof registrationQuestion.data.content === 'string')) {
                return false
            }
            if (registrationQuestion.data.content.length > 1000) {
                return false
            }
            return true
        default:
            return false
    }
}