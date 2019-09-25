import React, { Component } from 'react'
import './SettingsContainer.css'
import UserOptions from './UserOptions/UserOptions'

class SettingsContainer extends Component {

    render() {
        return (
            <div className="settings-container">
                <UserOptions />
            </div >
        )
    }
}

export default SettingsContainer