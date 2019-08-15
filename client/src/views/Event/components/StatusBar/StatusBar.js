import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './StatusBar.css'
import { FaSortUp } from 'react-icons/fa'
import Spinner from '../../../../commonComponents/Spinner/Spinner'

class StatusBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displayMenu: false,
            loading: false
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

    changeStatus = async (status) => {
        this.setState({ loading: true })
        const response = await this.props.EventStore.changeUserStatus(this.props.UserStore.currentUser._id, status)
        
        this.setState({ loading: false })
        if (!response) {
            alert('Status could not be changed.')
        }
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
        if (this.state.loading) {
            return (
                <div className="status-bar">
                    <div className="status-bar-content">
                        <Spinner />
                    </div>
                </div>
            )
        }
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
                    {this.styledStaus(status)}
                    <div className="status-bar-menu-icon">
                        <FaSortUp />
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'EventStore')(observer(StatusBar))