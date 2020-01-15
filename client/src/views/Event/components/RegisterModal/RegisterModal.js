import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './RegisterModal.css'
import SignedUser from './SignedUser/SignedUser'
import UnsignedUser from './UnsignedUser/UnsignedUser'
import RegisterQuestions from './RegisterQuestions/RegisterQuestions'
import Spinner from '../../../../commonComponents/Spinner/Spinner'


class RegisterModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            alias: ""
        }
    }

    changeAlias = (event) => {
        this.setState({ alias: event.target.value })
    }

    readyToJoin = () => {
        return this.props.UserStore.currentUser || this.state.alias.length > 0
    }

    join = async () => {
        const alias = this.state.alias.length > 0 ? this.state.alias : undefined

        this.setState({ loading: true })
        const response = await this.props.EventStore.joinEvent(
            this.props.EventStore.event._id, alias
        )
        this.setState({ loading: false })

        if (!response) {
            alert('Could not join, try again.')
        } else {
            this.props.toggleRegisterModal()
            this.props.changeActive('Guests')
        }
    }

    render() {
        return (
            <div className="register-modal">
                <div className="register-top-bar">
                    <div className="register-back-button" onClick={() => this.props.toggleRegisterModal()}>
                        Close
                    </div>
                </div>
                <div className="register-content">
                    <RegisterQuestions />
                    {this.props.UserStore.currentUser ?
                        <SignedUser
                            toggleRegisterModal={this.props.toggleRegisterModal}
                            isGuest={this.props.isGuest}
                        />
                        :
                        <UnsignedUser
                            alias={this.state.alias}
                            changeAlias={this.changeAlias}
                            toggleRegisterModal={this.props.toggleRegisterModal}
                        />
                    }
                    {this.readyToJoin() ?
                        <div className="register-button" onClick={this.join}>
                            {!this.state.loading ?
                                <div>
                                    Join event
                                </div>
                                :
                                <Spinner />
                            }
                        </div>
                        :
                        <div className="register-button join-disabled">
                            Join event
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'EventStore')(observer(RegisterModal))