import { observable, decorate, action, runInAction, toJS } from 'mobx'
import eventService from '../services/events'
import pictureService from '../services/pictures'

class EventStore {
    event = null
    saved = true

    async initializeEvent(eventUrl) {
        try {
            this.event = await eventService.getOne(eventUrl)
            this.saved = true
            //console.log('event initialized: ', toJS(this.event))
            return this.event
        } catch (error) {
            this.event = null
            return null
        }
    }

    async getEvent(eventUrl) {
        if (this.saved) {
            try {
                const event = await eventService.getOne(eventUrl)
                if (this.saved) {
                    this.event = event

                }
            } catch (error) { }
        }
    }

    async joinEvent(eventId, alias, answers) {
        try {
            this.event = await eventService.addRegistration(eventId, alias, answers)
            if (alias) {
                const existing = localStorage.getItem('joinedEvents')
                const joinedEvents = existing ? JSON.parse(existing) : []
                joinedEvents.push(eventId)
                localStorage.setItem('joinedEvents', JSON.stringify(joinedEvents))
            }
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

    async uploadEventBackground(file) {
        try {
            const picture = await pictureService.uploadEventBackground(this.event._id, file)
            this.setValue(picture.secure_url, 'background')
            return picture.secure_url
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
    save: action
})

export default new EventStore()