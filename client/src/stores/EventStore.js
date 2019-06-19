import { Component } from 'react'
import { observable, decorate, action } from 'mobx'

class EventStore extends Component {
    event = null

    setCurrentEvent(event) {
        this.currentUser = event
    }
}

decorate(EventStore, {
    currentUser: observable,
    setCurrentEvent: action
})

export default new EventStore()