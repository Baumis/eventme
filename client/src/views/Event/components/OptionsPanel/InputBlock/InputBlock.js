import React from 'react'
import './InputBlock.css'

const InputBlock = (props) => {

    const renderInput = () => {
        if (props.type === 'number') {
            return <input type={props.type} value={props.value || ''} onChange={props.changeValue} min={props.min} max={props.max} required></input>
        } else {
            return <input type={props.type} value={props.value || ''} onChange={props.changeValue} required></input>
        }
    }

    return (
        <div className="options-panel-content">
            <div className="inputBlock">
                <div className="inputLabel">
                    <label>{props.label}</label>
                </div>
                {renderInput()}
            </div>
        </div>
    )
}
export default InputBlock
