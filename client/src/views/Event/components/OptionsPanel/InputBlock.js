import React from 'react'
import './Options.css'

const InputBlock = (props) => {

    return (
        <div className="inputBlock">
            <div className="inputLabel">
                <label>{props.label}</label>
            </div>
            <input name={props.name} value={props.value} onChange={props.changeValue}></input>
        </div>
    )
}
export default InputBlock
