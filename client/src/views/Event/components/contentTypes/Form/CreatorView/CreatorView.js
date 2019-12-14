import React from 'react'
import './CreatorView.css'

const CreatorView = (props) => {

    return (
        <div className="form-component-creator">
            {props.component.data.questions.map((question, i) =>
                <div className="form-component-creator-option">
                    <div className="form-component-creator-question">
                        {question.label}
                    </div> 
                    <div className="form-component-button-row">
                        {props.isCreator() ?
                            <div className="form-component-creator-answers" onClick={() => props.openModal(question)}>
                                {`${question.answers.length} answers`}
                            </div>
                            : null}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatorView