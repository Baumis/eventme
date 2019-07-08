import React from 'react'
import './Options.css'

const InfoBlock = (props) => {

    return (
        <div className="infoBlock">
            <label>{props.label}</label>
            <input value={props.value} onChange={props.changeValue}></input>
        </div>
    )
}
export default InfoBlock