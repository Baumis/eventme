import React from 'react'
import './CreateInput.css'

const CreateInput = (props) => {

    return (
        <div className="create-input" style={props.style}>
            {props.label.length > 0 ?
                <div className="create-input-label">
                    <label>{props.label}</label>
                </div>
                : null}
            <input
                type={props.type}
                min={props.min}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                style={props.style}>
            </input>
        </div>
    )
}
export default CreateInput