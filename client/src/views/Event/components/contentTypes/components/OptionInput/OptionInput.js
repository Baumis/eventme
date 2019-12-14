import React from 'react'
import './OptionInput.css'

const OptionInput = (props) => {

    return (
        <div className="option-input">
            <div className="option-input-label">
                <label>{props.label}</label>
            </div>
            <input
                type={props.type}
                value={props.value}
                onChange={props.changeValue}>
            </input>
        </div>
    )
}
export default OptionInput