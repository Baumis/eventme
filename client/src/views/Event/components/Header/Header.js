import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import StatusBar from '../StatusBar/StatusBar'
import moment from 'moment'
import './Header.css'

class Header extends Component {

componentDidMount(){
    window.addEventListener('scroll', () => {
        this.scrollEffect()
    })
}

scrollEffect = () => {
    const element = document.getElementById('scroller')
    const yPosition = window.pageYOffset / 20
    element.style.top = yPosition + '%'
}

render() {
    const headerStyles = {
        color: 'white',
        backgroundImage: 'url(' + this.props.EventStore.event.background + ')'
    }
    return (
        <div style={headerStyles} className="event-header" id="scroller">
            <div className="event-header-content">
                <h1>{this.props.EventStore.event.label}</h1>
                <h3>{moment(this.props.EventStore.event.startDate).format('DD.MM.YYYY')}</h3>
            </div>
            {this.props.isGuest ?
                <div className="event-header-status-row">
                    <StatusBar />
                </div>
                : null}
        </div>
    )
}
}

export default inject('EventStore')(observer(Header))