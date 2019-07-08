import React from 'react'
import './Text.css'

const Text = ({ data }) => {
    return (
        <div className="TextComponent">
            <div className="TextTitle">
                <h2>{data.title}</h2>
            </div>
            <div className="TextContent">
                <p>{data.content}</p>
            </div>
        </div>
    )
}

export default Text