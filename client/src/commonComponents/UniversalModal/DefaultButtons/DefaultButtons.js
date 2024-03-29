import React from 'react'
import './DefaultButtons.css'
import Spinner from '../../Spinner/Spinner'

const DefaultButtons = (props) => {
    return (
        <div className="default-buttons">
            {props.negativeAction ?
                <div className="default-buttons-negative-button"
                    onClick={props.negativeAction}>
                    <div className="default-buttons-button-label">
                        {props.negativeLabel}
                    </div>
                </div>
                : null}
            {props.positiveAction ?
                <div className="default-buttons-positive-button"
                    onClick={props.positiveAction}>
                    <div className="default-buttons-button-label">
                        {props.showSpinner ?
                            <Spinner />
                            :
                            <div>{props.positiveLabel}</div>
                        }
                    </div>
                </div>
                : null}
        </div>
    )
}

export default DefaultButtons