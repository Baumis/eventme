import React from 'react'
import './Text.css'

const Text = (props) => {
    return (
        <div className="text-component">
            <div className={"text-component-title"}>
                <h2> {props.component.data.title} </h2>
            </div>
            <div className={"text-component-content "}>
                {props.component.data.content}
            </div>
        </div>
    )
}

export default Text