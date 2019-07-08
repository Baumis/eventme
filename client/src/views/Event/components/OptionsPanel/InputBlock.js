import React from 'react'
import './Options.css'

const InputBlock = (props) => {

    return (
        <div className="inputBlock">
            <div className="inputLabel">
                <label>{props.label}</label>
            </div>
            <input value={props.value} onChange={props.changeValue}></input>
        </div>
    )
}
export default InputBlock
