import { Component } from 'react'
import { observable, decorate, action, runInAction } from 'mobx'
import eventService from '../services/events'

class EventStore extends Component {
    event = null

    async initializeEvent() {
        const event = await eventService.getOne('5d07dcafa37e6c0904b17423')
        console.log('event initialized: ', event)

        runInAction(() => {
            this.event = event
        })
    }
}

decorate(EventStore, {
    event: observable,
    setCurrentEvent: action
})

export default new EventStore()