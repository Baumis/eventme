import React from 'react'
import './CreateInput.css'

const CreateInput = (props) => {

    return (
        <div className="create-input">
            <div className="create-input-label">
                <label>{props.label}</label>
            </div>
            <input
                type={props.type}
                min={props.min}
                value={props.value}
                onChange={props.onChange}
                style={props.style}>
            </input>
        </div>
    )
}
export default CreateInput