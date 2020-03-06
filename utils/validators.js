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