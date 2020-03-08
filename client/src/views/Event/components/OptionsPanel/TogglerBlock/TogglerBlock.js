import React from 'react'
import './TogglerBlock.css'

const TogglerBlock = (props) => {
    return (
        <div className="options-panel-content">
            <div className="togglerBlock">
                <div className="togglerLabel">
                    <label>{props.label}</label>
                </div>
                <input type={"checkbox"} checked={props.value} onChange={props.changeValue} required></input>
            </div>
        </div>
    )
}
export default TogglerBlock
