import React, { Component } from 'react'
import './MessageCard.css'
import { withRouter } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import CommentSection from './CommentSection/CommentSection'
import Moment from 'moment'

class MessageCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showComments: false
        }
    }

    toggleComments = () => {
        this.setState({ showComments: !this.state.showComments })
    }

    getAvatar = () => {
        if (!this.props.message.author.avatar) {
            return null
        }
        return { backgroundImage: `url(${this.props.message.author.avatar})` }
    }

    toProfile = (id) => {
        this.props.history.push(`/profile/${id}`)
    }
    render() {
        return (
            <div className="message-card">
                {!this.props.message.author ?
                    <div className="message-card-wrapper deleted">
                        Message deleted
                </div>
                    :
                    <div className="message-card-wrapper">
                        <div className="message-card-avatar-section">
                            <div style={this.getAvatar()} className="message-card-avatar"> </div>
                        </div>
                        <div className="message-card-info-section">
                            <div className="message-card-header">
                                <div className="message-card-time-author">
                                    <div className="message-card-author" onClick={() => this.toProfile(this.props.message.author._id)}>
                                        {this.props.message.author.name}
                                    </div>
                                    <div className="message-card-time">
                                        {Moment(this.props.message.time).format('D.MM.YY')}
                                    </div>
                                </div>
                                {this.props.isAuthor(this.props.message.author._id) ?
                                    <div className="message-card-delete" onClick={() => this.props.delete(this.props.message._id)}>
                                        <FaTimes />
                                    </div>
                                    : null}
                            </div>
                            <div className="message-card-content">
                                {this.props.message.content}
                            </div>
                            <div className="message-card-interaction">
                                <div className="message-card-comment-button" onClick={() => this.toggleComments()}>
                                    {`comments (${this.props.message.comments.length})`}
                                </div>
                                {this.state.showComments ?
                                    <div>
                                        <CommentSection
                                            comments={this.props.message.comments}
                                            messageId={this.props.message._id}
                                            isAuthor={this.props.isAuthor}
                                        />
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

export default withRouter(MessageCard)