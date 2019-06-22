import { observable, decorate, action, runInAction } from 'mobx'
import eventService from '../services/events'

class EventStore {
    event = null
    saved = true

    async initializeEvent() {
        //const event = await eventService.getOne('5d07dcafa37e6c0904b17423')
        const event = { "_id": "5d07dcafa37e6c0904b17423", "label": "This is me", "creator": { "_id": "5cd445507c2a502a18cba5ca", "name": "John Doe" }, "settings": { "background": "https://picsum.photos/1440/550" }, "infoPanel": { "phone": "", "email": "", "contact": "", "address": "", "date": "2019-06-17T18:22:49.820Z" }, "guests": [], "components": [{ "order": 1, "type": "Text", "data": { "title": "Moi", "content": "Moi taas" } }] }
        console.log('event initialized: ', event)

        runInAction(() => {
            this.event = event
        })
    }

    setValue(value, field) {
        runInAction(() => {
            this.event[field] = value
            this.saved = false
        })
    }

    setInfoPanelValue(value, field) {
        runInAction(() => {
            this.event.infoPanel[field] = value
            this.saved = false
        })
    }

    setSettingsValue(value, field) {
        runInAction(() => {
            this.event.settings[field] = value
            this.saved = false
        })
    }

    save() {
        this.saved = true
        // TODO: Save to backend.
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
        })
    }
}

decorate(EventStore, {
    event: observable,
    saved: observable,

    setCurrentEvent: action,
    setValue: action,
    setInfoPanelValue: action,
    setSettingsValue: action,
    getComponent: action,
    addComponent: action,
    save: action
})

export default new EventStore()