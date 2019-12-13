import React from 'react'
import './Submitted.css'

const Submitted = (props) => {

    return (
        <div className="form-component-submitted">
            {props.component.data.questions.map((question, i) =>
                <div className="form-component-submitted-option">
                    <div className="form-component-submitted-question">
                        {question.label}
                    </div> 
                    <div className="form-component-button-row">
                        {props.isCreator() ?
                            <div className="form-component-submitted-answers" onClick={() => props.openModal()}>
                                {`${question.answers.length} answers`}
                            </div>
                            : null}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Submitted