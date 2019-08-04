import React from 'react'
import './Options.css'
import { FaTimes } from 'react-icons/fa'
const InfoBlock = (props) => {

    return (
        <div className="options-panel-info-block">
            <input
                name={props.index}
                value={props.value}
                onChange={props.changeValue}>
            </input>
            <div className="options-panel-info-icon">
                icon
            </div>
            <div className="options-panel-info-delete">
                <FaTimes/>
            </div>
        </div>
    )
}
export default InfoBlock