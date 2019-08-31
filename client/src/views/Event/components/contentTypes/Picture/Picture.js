import React from 'react'
import './Picture.css'

const Picture = (props) => {

    const getPicture = () => {
        return { backgroundImage: `url(${props.data.url})` }
    }

    return (
        <div style={getPicture()} className="picture-container">
        </div>
    )
}


export default Picture