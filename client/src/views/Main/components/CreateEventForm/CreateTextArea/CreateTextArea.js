import React from 'react'
import './CreateTextArea.css'

const CreateTextArea = (props) => {

    return (
        <div className="create-textarea">
            <div className="create-textarea-label">
                <label>{props.label}</label>
            </div>
            <textarea
                value={props.value}
                onChange={props.onChange}
                style={props.style}
                rows={props.rows}>
            </textarea>
        </div>
    )
}
export default CreateTextArea