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

    setInfoPanelValue(value, field) {
        const newInfoPanel = {
            ...this.event.infoPanel,
            [field]: value
        }
        runInAction(() => {
            this.event.infoPanel = newInfoPanel
            this.saved = false
        })
    }

    addInfoPanelValue() {
        const newInfo = { icon: 'EMPTY', text: '' }
        this.event.infoPanel.push(newInfo)
        this.saved = false
    }

    deleteInfoPanelValue(index) {
        this.event.infoPanel.splice(index, 1)
        this.saved = false
    }

    changeInfoPanelText(text, index) {
        this.event.infoPanel[index].text = text
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
            this.event = await eventService.validateKey(eventId, inviteKey)
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

    addComponent(type, data) {
        const components = this.event.components
        components.push({
            order: components.length + 1,
            type: type,
            data: data
        })
        runInAction(() => {
            this.event.components = components
            this.saved = false
        })
    }

    saveComponentData(order, data, type) {
        const newValues = {
            order: order,
            type: type,
            data: data
        }
        runInAction(() => {
            this.event.components[order - 1] = newValues
            this.saved = false
        })
    }
}

decorate(EventStore, {
    event: observable,
    saved: observable,

    setCurrentEvent: action,
    setValue: action,
    setInfoPanelValue: action,
    getComponent: action,
    addComponent: action,
    saveComponentData: action,
    save: action
})

export default new EventStore()