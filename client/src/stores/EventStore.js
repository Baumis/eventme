import { observable, decorate, action, runInAction } from 'mobx'
import eventService from '../services/events'

class EventStore {
    event = null
    saved = true

    async initializeEvent(eventId) {
        let event = null
        if (eventId && eventId !== 'template') {
            event = await eventService.getOne(eventId)
            console.log('event initialized: ', event)
        } else {
            event = await eventService.getTemplate()
            console.log('event initialized: ', event)
        }
        runInAction(() => {
            this.event = event
        })
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

    async create(event) {
        try {
            this.event = await eventService.create(event)
            this.saved = true
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