import React from 'react'
import './Text.css'

const Text = (props) => {
    const borderStyle = props.edit ? 'text-editable-mode' : ''
    return (
        <div className="text-component">
            <div className={"text-component-title " + borderStyle} contentEditable={props.edit}>
                <h2>{props.data.title}</h2>
            </div>
            <div className={"text-component-content " + borderStyle} contentEditable={props.edit}>
                <p>{props.data.content}</p>
            </div>
        </div>
    )
}

export default Text