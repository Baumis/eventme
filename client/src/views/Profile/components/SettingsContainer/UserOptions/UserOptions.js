import React, { Component } from 'react'
import './UserOptions.css'
import Spinner from '../../../../../commonComponents/Spinner/Spinner'

class UserOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userValues: { ...this.props.user },
            saved: true,
            loading: false
        }
    }

    changeUserValue = (event) => {
        const values = this.state.userValues
        values[event.target.name] = event.target.value
        this.setState({ userValues: values, saved: false })
    }

    saveOptions = async () => {
        this.setState({ loading: true })
        const user = await this.props.save(this.state.userValues)
        this.setState({ loading: false })

        if (user) {
            this.setState({ saved: true })
        } else {
            alert('options could not be saved')
        }
    }

    render() {
        return (
            <div className="user-options-container">
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
                    <label>Profile cover url</label>
                    <input
                        name={'cover'}
                        value={this.state.userValues.cover}
                        onChange={this.changeUserValue}
                    />
                </div>
                <div className="user-options-input">
                    <label>Avatar url</label>
                    <input
                        name={'avatar'}
                        value={this.state.userValues.avatar}
                        onChange={this.changeUserValue}
                    />
                </div>
                <div className="user-options-button-row">
                    {this.state.saved ?
                        <div className="user-options-save-button" id="disabled">
                            Save
                            </div>
                        :
                        <div className="user-options-save-button" onClick={() => this.saveOptions()}>
                            {this.state.loading ?
                                <Spinner />
                                :
                                <div>Save</div>
                            }
                        </div>}
                </div>
            </div>
        )
    }
}

export default UserOptions