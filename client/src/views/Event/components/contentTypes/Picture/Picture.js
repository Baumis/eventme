import React from 'react'
import './Picture.css'

const Picture = (props) => {

    const getPicture = () => {
        const size = props.component.data.expand ? 'contain' : 'cover'
        return {
            backgroundImage: `url(${props.component.data.url})`,
            backgroundSize: size,
        }
    }
    
    return (
        <div style={getPicture()} className="picture-container"></div>
    )
}


export default Picture