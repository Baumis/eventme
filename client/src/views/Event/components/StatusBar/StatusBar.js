import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './StatusBar.css'
import { FaPhone } from 'react-icons/fa'

class StatusBar extends Component {

    checkUserStatus = () => {
        return this.props.EventStore.getUserStatus(this.props.UserStore.currentUser._id)
    }

    styledStaus = (status) => {
        const color = status === 'GOING' ? 'green'
            : status === 'PENDING' ? 'orange'
                : status === 'DECLINED' ? 'red'
                    : 'black'
        status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        return <div style={{color: color}}>{status}</div>
    }

    render() {

        const status = this.checkUserStatus()

        return (
            <div className="status-bar" >
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