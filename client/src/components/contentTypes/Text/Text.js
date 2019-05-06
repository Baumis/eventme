import React from 'react'
import './Text.css'

const Text = ({ data }) => {
    return (
        <div className="Container">
            <h3>{data.title}</h3>
            <p>{data.content}</p>
        </div>
    )
}

export default Text