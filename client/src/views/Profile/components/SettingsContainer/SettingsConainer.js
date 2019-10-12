import React, { Component } from 'react'
import './SettingsContainer.css'
import UserOptions from './UserOptions/UserOptions'

class SettingsContainer extends Component {

    render() {
        return (
            <div className="settings-container">
                <UserOptions
                    user={this.props.user}
                    save={this.props.save}
                />
            </div >
        )
    }
}

export default SettingsContainer