import React from 'react'
import './TextContainer.css'

const TextContainer = (props) => {
    return (
        <div className="text-container">
            <div className="text-container-content">
                <h2>{props.title}</h2>
                <p>{props.message}</p>
            </div>
        </div>
    )
}

export default TextContainer