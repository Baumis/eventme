import React from 'react'
import './Location.css'

const Location = ({ data }) => {
    return (
        <div className="ContentContainer">
            <h2>{data.title}</h2>
            <h3>longitude</h3>
            <p>{data.longitude}</p>
            <h3>latitude</h3>
            <p>{data.latitude}</p>
        </div>
    )
}

export default Location