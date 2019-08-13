import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './UserOptions.css'
import { FaTimes } from 'react-icons/fa'

class UserOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userValues: { ... this.props.user }
        }
    }

    changeUserValue = (event) => {
        const values = this.state.userValues
        values[event.target.name] = event.target.value
        this.setState({ userValues: values })
    }

    saveUserValues = () => {
        this.props.UserStore.saveUser(this.state.userValues)
    }

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
                            name={'name'}
                            value={this.state.userValues.name}
                            onChange={this.changeUserValue}
                        />
                    </div>
                    <div className="user-options-input">
                        <label>Email</label>
                        <input
                            name={'email'}
                            value={this.state.userValues.email}
                            onChange={this.changeUserValue}
                        />
                    </div>
                    <div className="user-options-input">
                        <label>Profile background</label>
                        <input
                            name={'cover'}
                            value={this.state.userValues.cover}
                            onChange={this.changeUserValue}
                        />
                    </div>
                    <div className="user-options-input">
                        <label>Avatar</label>
                        <input
                            name={'avatar'}
                            value={this.state.userValues.avatar}
                            onChange={this.changeUserValue}
                        />
                    </div>
                    <div className="user-options-button-row">
                        <div className="user-options-save-button" onClick={() => this.saveUserValues()}>
                            Save
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(UserOptions))