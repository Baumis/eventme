import React from 'react'
import './CreateToggler.css'

const CreateToggler = (props) => {
    return (
        <div className="create-toggler">
            <div className="create-toggler-label">
                <label>{props.label}</label>
            </div>
            <div className="create-toggler-row">
                <label className="create-toggler-switch">
                    <input type={"checkbox"} checked={props.value} onChange={props.changeValue}></input>
                    <span className="switch-slider"></span>
                </label>
                <div className="create-toggler-description">
                    {props.info}
                </div>
            </div>
        </div>
    )
}
export default CreateToggler
