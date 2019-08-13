import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './UserOptions.css'
import { FaTimes } from 'react-icons/fa'

class UserOptions extends Component {

    render() {

        return (
            <div className="user-options-background">
                <div className="user-options-container">
                    <div className="user-options-top-row">
                        <div className="user-options-exit-icon" onClick={() => this.props.toggleOptions()}>
                            <FaTimes />
                        </div>
                    </div>
                    <div className="user-options-input">
                        <label>Name</label>
                        <input
                            value={this.props.UserStore.currentUser.name}
                        />
                    </div>
                    <div className="user-options-input">
                        <label>Email</label>
                        <input
                            value={this.props.UserStore.currentUser.email}
                        />
                    </div>
                    <div className="user-options-input">
                        <label>Profile background</label>
                        <input
                            value={this.props.UserStore.currentUser.background}
                        />
                    </div>
                    <div className="user-options-input">
                        <label>Avatar</label>
                        <input
                            value={this.props.UserStore.currentUser.avatar}
                        />
                    </div>
                    <div className="user-options-button-row">
                        <div
                            className="user-options-save-button">
                            Save
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(UserOptions))