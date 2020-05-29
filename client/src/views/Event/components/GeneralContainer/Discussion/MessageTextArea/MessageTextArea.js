import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './MessageTextArea.css'
import Spinner from '../../../../../../commonComponents/Spinner/Spinner'

class MessageTextArea extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messageInput: '',
            sending: false
        }
    }

    post = async () => {

        if (!this.props.UserStore.currentUser) {
            this.props.VisibilityStore.showSignModal()
            return
        }

        if (this.state.sending) {
            return
        }

        if (this.state.messageInput.length < 1) {
            return
        }

        if (!this.props.EventStore.saved) {
            this.props.VisibilityStore.showAlert(
                'Unsaved changes',
                'Please save your event before posting message.',
                'OK',
                () => this.props.VisibilityStore.closeAlert(),
            )
            return
        }

        this.setState({ sending: true })
        const event = await this.props.EventStore.postMessage(this.state.messageInput)
        this.setState({ sending: false })

        if (!event) {
            this.props.VisibilityStore.showAlert(
                'Fail',
                'The post could not be sent.',
                'OK',
                () => this.props.VisibilityStore.closeAlert(),
            )
        } else {
            this.setState({ messageInput: '' })
        }
    }

    changeInputValue = (event) => {
        this.setState({ messageInput: event.target.value })
    }

    getAvatar = () => {
        if (!this.props.UserStore.currentUser || !this.props.UserStore.currentUser.avatar) {
            return { backgroundImage: `url(${require('../../../../../../assets/avatar.png')})` }
        }
        return { backgroundImage: `url(${this.props.UserStore.currentUser.avatar})` }
    }

    sendButtonClass = () => {
        let className = "text-area-send-button"
        if (this.state.messageInput.length === 0) {
            className += " text-area-send-button-disabled"
        }
        return className
    }

    render() {
        return (
            <div className="text-area-container">
                <div className="text-area-avatar" style={this.getAvatar()}></div>
                <div className="text-area-input">
                    <input
                        onChange={this.changeInputValue}
                        value={this.state.messageInput}
                        placeholder={'your message'}
                    />
                </div>
                <div className="text-area-button-row">
                    <div className={this.sendButtonClass()} onClick={() => this.post()}>
                        {this.state.sending ?
                            <Spinner />
                            :
                            <div>post</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore', 'VisibilityStore')(observer(MessageTextArea))