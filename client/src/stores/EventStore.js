import { observable, decorate, action, runInAction } from 'mobx'
import eventService from '../services/events'

class EventStore {
    event = null
    saved = true
    id = null

    async initializeEvent() {
        let event = null
        if (this.id !== null) {
            //const event = await eventService.getOne('5d07dcafa37e6c0904b17423')
            event = { "_id": "5d07dcafa37e6c0904b17423", "label": "This is me", "creator": { "_id": "5cd445507c2a502a18cba5ca", "name": "John Doe" }, "settings": { "background": "https://picsum.photos/1440/550" }, "infoPanel": { "phone": "", "email": "", "contact": "", "address": "", "date": "2019-06-17T18:22:49.820Z" }, "guests": [], "components": [{ "order": 1, "type": "Guests", "data": { "title": "Moi", "content": "Moi taas" } }, { "order": 2, "type": "TEXT", "data": { "title": "Moi", "content": "ajkdnkajwdka  wndkjawdnkjawndkj awjdnjkawndkjanwkjdn ajdnajkwdkndkjan jwdnkajdna adnawjkd  dwad  dwd  njn  dhebf  eab jhbef jab dwjd uwdhuwaidh h duwh wudhfr surf efsuefh ish siefuhesif is siufhsuifh isuhfseun iushf isufheif is sfe fisufh " } }] }
            console.log('event initialized: ', event)
        } else {
            //event = await eventService.getTemplate()
            let demoGuests = [
                {name: 'Jami', status: 'going'},
                {name: 'Jussi', status: 'going'},
                {name: 'Erik', status: 'going'},
                {name: 'Pertti', status: 'going'},
                {name: 'Ville', status: 'going'},
                {name: 'Kalevi', status: 'going'},
                {name: 'Terho', status: 'going'},
                {name: 'Kimmo', status: 'going'},
            ]
            event = { "_id": "5d07dcafa37e6c0904b17423", "label": "This is me", "creator": { "_id": "5cd445507c2a502a18cba5ca", "name": "John Doe" }, "settings": { "background": "https://picsum.photos/1440/550" }, "infoPanel": { "phone": "", "email": "", "contact": "", "address": "", "date": "2019-06-17T18:22:49.820Z" }, "guests": demoGuests, "components": [{ "order": 1, "type": "GUESTS", "data": { "title": "Moi", "content": "Moi taas" } }, { "order": 2, "type": "TEXT", "data": { "title": "Moi", "content": "ajkdnkajwdka  wndkjawdnkjawndkj awjdnjkawndkjanwkjdn ajdnajkwdkndkjan jwdnkajdna adnawjkd  dwad  dwd  njn  dhebf  eab jhbef jab dwjd uwdhuwaidh h duwh wudhfr surf efsuefh ish siefuhesif is siufhsuifh isuhfseun iushf isufheif is sfe fisufh " } }] }
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
    setSettingsValue: action,
    getComponent: action,
    addComponent: action,
    saveComponentData: action,
    save: action
})

export default new EventStore()