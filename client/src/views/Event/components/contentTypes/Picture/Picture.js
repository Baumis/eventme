import React from 'react'
import './Picture.css'

const Picture = (props) => {

    const getPicture = () => {
        return { backgroundImage: `url(${props.data.url})` }
    }

    const changeUrl = (event) => {
        const dataObject = {
            url: event.target.value
        }
        props.changeData(dataObject)
    }

    return (
        <div style={getPicture()} className="picture-container">
            {props.edit ?
                <div className="picture-url-row">
                    <input
                        value={props.data.url}
                        onChange={changeUrl}
                        placeholder={'picture url'}
                    />
                </div>
                : null}
        </div>
    )
}


export default Picture