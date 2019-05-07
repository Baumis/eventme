import React from 'react'
import './Text.css'

const Text = ({ data }) => {
    return (
        <div className="Container">
            <div className="Title">
                <h2>{data.title}</h2>
            </div>
            <div className="TextContent">
                <p>{data.content}</p>
            </div>
        </div>
    )
}

export default Text