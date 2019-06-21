import { observable, decorate, action, runInAction } from 'mobx'
import eventService from '../services/events'

class EventStore {
    event = null
    saved = true

    async initializeEvent() {
        //const event = await eventService.getOne('5d07dcafa37e6c0904b17423')
        const event = { "_id": "5d07dcafa37e6c0904b17423", "label": "This is me", "creator": { "_id": "5cd445507c2a502a18cba5ca", "name": "John Doe" }, "settings": { "background": "https://picsum.photos/1440/550" }, "infoPanel": { "phone": "", "email": "", "contact": "", "address": "", "date": "2019-06-17T18:22:49.820Z" }, "guests": [], "components": [{"Type": "Text", "data": {"title": "Moi", "content": "Moi taas"}}] }
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
    save(){
        this.saved = true
        // TODO: Save to backend.
    }
}

decorate(EventStore, {
    event: observable,
    saved: observable,

    setCurrentEvent: action,
    setValue: action,
    setInfoPanelValue: action,
    setSettingsValue: action,
    save: action
})

export default new EventStore()