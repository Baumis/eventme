import { observable, decorate, action, runInAction } from 'mobx'
import eventService from '../services/events'

class EventStore {
    event = null
    saved = true

    async initializeEvent(eventId) {
        try {
            this.event = await eventService.getOne(eventId)
            console.log('event initialized: ', this.event)
            return this.event
        } catch (error) {
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

    addInfoPanelValue() {
        const newInfo = { icon: 'EMPTY', text: '' }
        this.event.infoPanel.push(newInfo)
        this.saved = false
    }

    deleteInfoPanelValue(index) {
        const newInfoPanel = this.event.infoPanel.slice()
        newInfoPanel.splice(index, 1)
        this.event.infoPanel = newInfoPanel
        this.saved = false
    }

    changeInfoPanelText(text, index) {
        const newInfoPanel = this.event.infoPanel.slice()
        newInfoPanel[index].text = text
        this.event.infoPanel = newInfoPanel
        this.saved = false
    }

    changeInfoPanelIcon(icon, index) {
        const newInfoPanel = this.event.infoPanel.slice()
        newInfoPanel[index].icon = icon
        this.event.infoPanel = newInfoPanel
        this.saved = false
    }

    async joinEvent(eventId, inviteKey) {
        try {
            this.event = await eventService.joinEvent(eventId, inviteKey)
            return this.event
        } catch (error) {
            return null
        }
    }

    async removeGuest(eventId, userId) {
        try {
            this.event = await eventService.removeGuest(eventId, userId)
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

    async validateKey(eventId, inviteKey) {
        try {
            this.event = await eventService.getOneWithKey(eventId, inviteKey)
            return this.event
        } catch (error) {
            return null
        }
    }

    async updateKey() {
        try {
            this.event = await eventService.updateKey(this.event._id)
            return this.event
        } catch (error) {
            return null
        }
    }

    getUserStatus(id) {
        const guest = this.event.guests.find(guest => guest.user._id === id)
        if (guest) {
            return guest.status
        }
        return null
    }

    async changeUserStatus(userId, status) {
        try {
            this.event = await eventService.changeStatus(this.event._id, userId, status)
            return this.event
        } catch {
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

    getComponent(order) {
        return this.event.components.find(component => component.order === order)
    }

    removeComponent(order) {
        const newComponents = this.event.components.filter(component => component.order !== order)
        const orderedComponents = newComponents.map((component, i) => {
            component.order = i + 1
            return (component)
        })
        runInAction(() => {
            this.event.components = orderedComponents
            this.saved = false
        })
    }

    createComponent(type, data) {
        const event = { ...this.event }
        event.components.push({
            order: event.components.length + 1,
            type: type,
            data: data
        })
            this.event = event
            this.saved = false
    }

    editComponentData(order, data) {
        const event = { ...this.event }
        event.components.find(comp => comp.order === order).data = data
        this.event = event
        this.saved = false
    }
}

decorate(EventStore, {
    event: observable,
    saved: observable,

    setCurrentEvent: action,
    setValue: action,
    setInfoPanelValue: action,
    changeInfoPanelText: action,
    deleteInfoPanelValue: action,
    addInfoPanelValue: action,
    changeInfoPanelIcon: action,
    getComponent: action,
    addComponent: action,
    saveComponentData: action,
    save: action
})

export default new EventStore()