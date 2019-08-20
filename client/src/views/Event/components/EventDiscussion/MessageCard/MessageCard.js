import React from 'react'
import './MessageCard.css'
import { withRouter } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import Moment from 'moment'

const MessageCard = (props) => {

    const getAvatar = () => {
        return { backgroundImage: `url(${props.message.author.avatar})` }
    }

    const toProfile = (id) => {
        props.history.push(`/profile/${id}`)
    }

    return (
        <div className="message-card">
            {!props.message.author ?
                <div className="message-card-wrapper" id="deleted">
                    deleted
                </div>
                :
                <div className="message-card-wrapper">
                    <div className="message-card-avatar-section">
                        <div style={getAvatar()} className="message-card-avatar"> </div>
                    </div>
                    <div className="message-card-info-section">
                        <div className="message-card-header">
                            <div className="message-card-time-author">
                                <div className="message-card-author" onClick={() => toProfile(props.message.author._id)}>
                                    {props.message.author.name}
                                </div>
                                <div className="message-card-time">
                                    {Moment(props.message.time).format(' D MM YYYY hh:mm')}
                                </div>
                            </div>
                            {props.isAuthor(props.message.author._id) ?
                                <div className="message-card-delete" onClick={() => props.delete(props.message._id)}>
                                    <FaTimes />
                                </div>
                                : null}
                        </div>
                        <div className="message-card-content">
                            {props.message.content}
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default withRouter(MessageCard)