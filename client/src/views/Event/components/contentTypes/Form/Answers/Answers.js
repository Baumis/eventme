import React from 'react'
import './Answers.css'

const Answers = (props) => {
    return (
        <div className="form-component-answers">
            <div className="form-component-back-button-row">
                <div className="form-component-back-button" onClick={() => props.toggleAnswers()}>
                    Back
                </div>
            </div>
            {props.component.data.questions.map(( question, i ) =>
                <div className="form-component-answers-question" key={i}>
                    <div className="form-component-answers-question-title">
                        {question.label}
                    </div>
                    {question.answers.map((answer, i) =>
                        <div className="form-component-answers-user-row" key={i}>
                            {answer.user}
                            {answer.content}
                        </div>
                    )}
                </div>
            )
            }
        </div>
    )
}

export default Answers