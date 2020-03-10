import React from 'react'
import './TogglerBlock.css'

const TogglerBlock = (props) => {
    return (
        <div className="options-panel-content">
            <div className="toggler-block">
                <div className="toggler-block-label">
                    <label>{props.label}</label>
                </div>
                <div className="toggler-block-toggler-row">
                    <label className="toggler-block-switch">
                        <input type={"checkbox"} checked={props.value} onChange={props.changeValue}></input>
                        <span className="switch-slider"></span>
                    </label>
                    <div className="toggler-block-description">
                        {props.info}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TogglerBlock
