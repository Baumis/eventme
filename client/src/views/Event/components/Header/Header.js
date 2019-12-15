import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FaCalendar } from 'react-icons/fa'
import moment from 'moment'
import './Header.css'

class Header extends Component {

    componentDidMount() {
        window.addEventListener('scroll', this.scrollEffect)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollEffect)
    }

    scrollEffect = () => {
        const element = document.getElementById('slower-picture')
        const yPosition = window.pageYOffset / 60
        element.style.top = yPosition + '%'
    }

    render() {
        const headerStyles = {
            color: 'white',
            backgroundImage: 'url(' + this.props.EventStore.event.background + ')'
        }
        return (
            <div style={headerStyles} className="event-header" id="slower-picture">
                <div className="event-header-content-wrapper">
                    <div className="event-header-content">
                        <h1>{this.props.EventStore.event.label}</h1>
                        <div className="event-header-date">
                            <FaCalendar />
                            <h3>{moment(this.props.EventStore.event.startDate).format('DD.MM.YYYY')}</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(Header))