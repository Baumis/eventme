import React from 'react'
import './Text.css'

const Text = ({ data }) => {
    return (
        <div className="Container">
            <h2>{data.title}</h2>
            <p>{data.content}</p>
        </div>
    )
}

export default Text