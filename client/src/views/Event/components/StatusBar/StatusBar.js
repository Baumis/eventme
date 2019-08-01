import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './StatusBar.css'
import { FaPhone } from 'react-icons/fa'

class StatusBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displayMenu: false
        }
    }

    openMenu = () => {
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideMenu)
        })
    }

    hideMenu = () => {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideMenu)
        })
    }

    changeStatus = (status) => {
        this.props.EventStore.changeUserStatus(this.props.UserStore.currentUser._id, status)
    }

    checkUserStatus = () => {
        return this.props.EventStore.getUserStatus(this.props.UserStore.currentUser._id)
    }

    styledStaus = (status) => {
        const color = status === 'GOING' ? 'green'
            : status === 'PENDING' ? 'orange'
                : status === 'DECLINED' ? 'red'
                    : 'black'
        status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        return <div style={{ color: color }}>{status}</div>
    }

    render() {

        const status = this.checkUserStatus()
        return (
            <div className="status-bar" onClick={() => this.openMenu()}>
                {this.state.displayMenu ?
                    <div className="status-bar-menu">
                        <div className="status-bar-menu-item" onClick={() => this.changeStatus('GOING')} >Going</div>
                        <div className="status-bar-menu-item" onClick={() => this.changeStatus('PENDING')}>Pending</div>
                        <div className="status-bar-menu-item" onClick={() => this.changeStatus('DECLINED')}>Declined</div>
                    </div>
                    : null
                }
                <div className="status-bar-content">
                    <div>
                        {this.styledStaus(status)}
                    </div>
                </div>
            </div>
        )
    }
}

export default inject("UserStore", "EventStore")(observer(StatusBar))