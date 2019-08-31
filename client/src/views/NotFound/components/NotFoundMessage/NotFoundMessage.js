import React from 'react'
import './NotFoundMessage.css'

const NotFoundMessage = (props) => {
    return (
        <div className="NF-message-container">
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </div>
    )
}

export default NotFoundMessage