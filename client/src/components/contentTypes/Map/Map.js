import React from 'react'
import './Map.css'

const Map = ({ data }) => {
    return (
        <div className="Container">
            <h2>{data.title}</h2>
            <h3>longitude</h3>
            <p>{data.longitude}</p>
            <h3>latitude</h3>
            <p>{data.latitude}</p>
        </div>
    )
}

export default Map