import React from 'react'
import './InputBlock.css'

const InputBlock = (props) => {

    return (
        <div className="options-panel-content">
            <div className="inputBlock">
                <div className="inputLabel">
                    <label>{props.label}</label>
                </div>
                <input type={props.type} value={props.value} onChange={props.changeValue}></input>
            </div>
        </div>
    )
}
export default InputBlock
