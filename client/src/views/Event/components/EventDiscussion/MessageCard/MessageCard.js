import React from 'react'
import './MessageCard.css'
import { withRouter } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
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
            <div className="message-card-avatar-section">
                <div style={getAvatar()} className="message-card-avatar"> </div>
            </div>
            <div className="message-card-info-section">
                <div className="message-card-header">
                    <div className="message-card-author" onClick={() => toProfile(props.message.author._id)}>
                        {props.message.author.name}
                    </div>
                    <div className="message-card-time">
                        {Moment(props.message.time).format(' D MM YYYY hh:mm')}
                    </div>
                    {props.isOwner ?
                        <div className="message-card-delete">
                            <FaTrash />
                        </div>
                        : null}
                </div>
                <div className="message-card-content">
                    {props.message.content}
                </div>
            </div>
        </div>
    )
}

export default withRouter(MessageCard)