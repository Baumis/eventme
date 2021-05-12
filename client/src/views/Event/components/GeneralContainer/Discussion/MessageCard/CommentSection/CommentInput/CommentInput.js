import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './CommentInput.css'
import Spinner from '../../../../../../../../commonComponents/Spinner/Spinner'
import AvatarPic from '../../../../../../../../assets/avatar.png'

class CommentInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            commentInput: '',
            sending: false
        }
    }

    comment = async () => {

        if (this.state.sending) {
            return
        }

        if (this.state.commentInput.length < 1) {
            return
        }

        if (!this.props.EventStore.saved) {
            alert('Please save your event before commenting.')
            return
        }

        this.setState({ sending: true })
        const event = await this.props.EventStore.postComment(this.props.messageId, this.state.commentInput)
        this.setState({ sending: false })

        if (!event) {
            alert('The comment could not be sent.')
        } else {
            this.setState({ commentInput: '' })
        }
    }

    changeInputValue = (event) => {
        this.setState({ commentInput: event.target.value })
    }

    getAvatar = () => {
        if (!this.props.UserStore.currentUser.avatar) {
            return { backgroundImage: `url(${AvatarPic})` }
        }
        return { backgroundImage: `url(${this.props.UserStore.currentUser.avatar})` }
    }

    sendButtonClass = () => {
        let className = 'comment-input-send-button'
        if (this.state.commentInput.length === 0) {
            className += ' comment-input-send-button-disabled'
        }
        return className
    }

    render() {

        if (!this.props.UserStore.currentUser) {
            return null
        }

        return (
            <div className="comment-input-container">
                <div className="comment-input-avatar" style={this.getAvatar()}></div>
                <div className="comment-input-input-container">
                    <input
                        onChange={this.changeInputValue}
                        value={this.state.commentInput}
                        placeholder={'comment'}
                    />
                </div>
                <div className="comment-input-button-row">
                    <div className={this.sendButtonClass()} onClick={() => this.comment()}>
                        {this.state.sending ?
                            <Spinner />
                            :
                            <div>send</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(CommentInput))