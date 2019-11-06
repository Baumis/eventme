import React from 'react'
import './Comment.css'
import Moment from 'moment'
import { withRouter } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const Comment = (props) => {

    const getAvatar = () => {
        if (!this.props.comment.author.avatar) {
            return null
        }
        return { backgroundImage: `url(${this.props.comment.author.avatar})` }
    }

    const toProfile = (id) => {
        this.props.history.push(`/profile/${id}`)
    }

    return (
        <div className="message-card">
            {!props.comment.author ?
                <div className="message-card-wrapper deleted">
                    Message deleted
                </div>
                :
                <div className="message-card-wrapper">
                    <div className="message-card-avatar-section">
                        <div style={getAvatar()} className="message-card-avatar"> </div>
                    </div>
                    <div className="message-card-info-section">
                        <div className="message-card-header">
                            <div className="message-card-time-author">
                                <div className="message-card-author" onClick={() => toProfile(props.comment.author._id)}>
                                    {props.comment.author.name}
                                </div>
                                <div className="message-card-time">
                                    {Moment(props.comment.time).format(' D.MM.YY HH:mm')}
                                </div>
                            </div>
                            {props.isAuthor(this.props.comment.author._id) ?
                                <div className="message-card-delete" onClick={() => props.delete(props.comment._id)}>
                                    <FaTimes />
                                </div>
                                : null}
                        </div>
                        <div className="message-card-content">
                            {props.comment.content}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Comment