import React from 'react'
import './Submitted.css'

const Submitted = (props) => {
    return (
        <div className="form-component-submitted">
            Your answers have been submitted.
            <div className="form-component-button-row">
                {props.isCreator() ?
                    <div className="form-component-answers-button" onClick={() => props.openModal()}>
                        Answers
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default Submitted