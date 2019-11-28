import React from 'react'
import './Picture.css'
import { FaExpand, FaCompress } from 'react-icons/fa'

const Picture = (props) => {

    const getPicture = () => {
        const size = props.component.data.expand ? 'contain' : 'cover'
        return {
            backgroundImage: `url(${props.component.data.url})`,
            backgroundSize: size,
        }
    }

    const changeUrl = (event) => {
        const dataObject = {
            url: event.target.value,
            expand: props.component.data.expand
        }
        props.changeData(dataObject)
    }

    const changeSize = (event) => {
        const dataObject = {
            url: props.component.data.url,
            expand: !props.component.data.expand
        }
        props.changeData(dataObject)
    }

    return (
        <div style={getPicture()} className="picture-container">
            {props.edit ?
                <div className="picture-url-row">
                    <input
                        value={props.component.data.url}
                        onChange={changeUrl}
                        placeholder={'picture url'}
                    />
                    <div className="picture-size-button" onClick={() => changeSize()}>
                        {props.component.data.expand ?
                            <FaExpand />
                            :
                            <FaCompress />
                        }
                    </div>
                </div>
                : null}
        </div>
    )
}


export default Picture