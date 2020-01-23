import { observable, decorate, action, runInAction, toJS } from 'mobx'
import eventService from '../services/events'

class EventStore {
    event = null
    saved = true

    questions = [
        { content: 'Kuka olet?', answers: [{ user: { name: 'Esko Aho' }, content: 'Minä en tahdo kertoa itsestäni mitään. Olen täysin yksin tässä maailmassa.' }] },
        { content: 'MItä haluaisit syödä illalla?', answers: [] },
        { content: 'Haluatko jatkaa jäähallilta ravintolaan?', answers: [] }
    ]

    adQuestion(question) {
        this.questions.push(question)
    }
    removeQuestion(index) {
        this.questions.slice(index, 1)
    }

    async initializeEvent(eventId) {
        try {
            this.event = await eventService.getOne(eventId)
            console.log('event initialized: ', toJS(this.event))
            return this.event
        } catch (error) {
            this.event = null
            return null
        }
    }

    async getEvent(eventId) {
        if (this.saved) {
            try {
                const event = await eventService.getOne(eventId)
                if (this.saved) {
                    this.event = event

                }
            } catch (error) { }
        }
    }

    async joinEvent(eventId, alias) {
        try {
            this.event = await eventService.addRegistration(eventId, alias)
            return this.event
        } catch (error) {
            return null
        }
    }

    async removeGuest(eventId, userId) {
        try {
            this.event = await eventService.removeRegistration(eventId, userId)
            return this.event
        } catch (error) {
            return null
        }
    }

    async deleteEvent() {
        try {
            await eventService.remove(this.event._id)
            return true
        } catch (error) {
            return false
        }
    }

    async create(event) {
        try {
            this.event = await eventService.create(event)
            return this.event
        } catch (error) {
            return null
        }
    }

    async update() {
        try {
            this.event = await eventService.update(this.event)
            this.saved = true
            return this.event
        } catch (error) {
            return null
        }
    }

    async postMessage(message) {
        try {
            this.event = await eventService.addMessage(this.event._id, message)
            return this.event
        } catch {
            return null
        }
    }

    async deleteMessage(messageId) {
        try {
            this.event = await eventService.removeMessage(this.event._id, messageId)
            return this.event
        } catch {
            return null
        }
    }

    async postComment(messageId, comment) {
        try {
            this.event = await eventService.addComment(this.event._id, messageId, comment)
            return this.event
        } catch {
            return null
        }
    }

    async deleteComment(messageId, commentId) {
        try {
            this.event = await eventService.removeComment(this.event._id, messageId, commentId)
            return this.event
        } catch {
            return null
        }
    }

    async addAnswersToFormComponent(componentId, answers) {
        try {
            this.event = await eventService.addAnswersToFormComponent(this.event._id, componentId, answers)
            return this.event
        } catch {
            return null
        }
    }

    setValue(value, field) {
        const newEvent = {
            ...this.event,
            [field]: value
        }
        runInAction(() => {
            this.event = newEvent
            this.saved = false
        })
    }

    getUserStatus(id) {
        const guest = this.event.guests.find(guest => guest.user._id === id)
        if (guest) {
            return guest.status
        }
        return null
    }

    removeComponent(index) {
        const event = { ...this.event }
        event.components.splice(index, 1)

        this.event = event
        this.saved = false
    }

    createComponent(component) {
        const event = { ...this.event }
        event.components.push(component)

        this.event = event
        this.saved = false
    }

    editComponentData(index, data) {
        const event = { ...this.event }
        event.components[index].data = data

        this.event = event
        this.saved = false
    }

    moveComponentForward(index) {
        const event = { ...this.event }
        const copy = event.components[index]

        if (event.components.length !== index + 1) {
            event.components[index] = event.components[index + 1]
            event.components[index + 1] = copy
        } else {
            event.components[index] = event.components[0]
            event.components[0] = copy
        }

        this.event = event
        this.saved = false
    }

    moveComponentBackward(index) {
        const event = { ...this.event }
        const copy = event.components[index]

        if (index > 0) {
            event.components[index] = event.components[index - 1]
            event.components[index - 1] = copy
        } else {
            event.components[index] = event.components[event.components.length - 1]
            event.components[event.components.length - 1] = copy
        }

        this.event = event
        this.saved = false
    }

    async addVoteToVoteComponent(componentId, optionId) {
        try {
            this.event = await eventService.addVoteToVoteComponent(this.event._id, componentId, optionId)
            return this.event
        } catch {
            return null
        }
    }
}

decorate(EventStore, {
    event: observable,
    saved: observable,

    initializeEvent: action,
    getEvent: action,
    setValue: action,
    postMessage: action,
    deleteMessage: action,
    postComment: action,
    deleteComment: action,
    getComponent: action,
    addComponent: action,
    addAnswersToFormComponent: action,
    saveComponentData: action,
    save: action
})

export default new EventStore()