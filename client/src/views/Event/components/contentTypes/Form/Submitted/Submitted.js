import React from 'react'
import './Submitted.css'

const Submitted = (props) => {
    return (
        <div className="form-component-submitted">
            Your answers has been submitted.
            <div className="form-component-button-row">
                {props.isCreator() ?
                    <div className="form-component-answers-button" onClick={() => props.toggleAnswers()}>
                        Answers
                    </div>
                    : null}
            </div>
        </div>
    )
}

export default Submitted