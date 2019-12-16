import React from 'react'
import './DefaultButtons.css'

const DefaultButtons = (props) => {
    return (
        <div className="default-buttons">
            <div className="default-buttons-negative-button"
                onClick={props.negativeAction}>
                {props.negativeLabel}
            </div>
            <div className="default-buttons-positive-button"
                onClick={props.positiveAction}>
                {props.positiveLabel}
            </div>
        </div>
    )
}

export default DefaultButtons