import React from 'react'
import './Text.css'

const Text = ({ data }) => {
    return (
        <div className="Container">
            <h3>{data.text}</h3>
        </div>
    )
}

export default Text