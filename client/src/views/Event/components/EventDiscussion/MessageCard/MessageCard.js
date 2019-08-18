import React from 'react'
import './MessageCard.css'
import { FaTrash } from 'react-icons/fa'
import Moment from 'moment'

const MessageCard = ( props ) => {
    return (
        <div className="message-card">
            <div className="message-card-header">
                <div className="message-card-time">
                    {Moment(props.message.time).format('h:mm')}
                </div>
                <div className="message-card-author">
                    {props.message.author.name}
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
    )
}

export default MessageCard