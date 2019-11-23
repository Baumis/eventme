import React from 'react'
import './Submitted.css'

const Answers = (props) => {
    return (
        <div className="form-component-answers">
            {this.props.component.data.questions.map(question => {
                <div className="form-component-answers-question">
                    <div className="form-component-answers-question-title">
                        {question.label}
                    </div>
                    {question.answers.map(answer => {
                        <div className="form-component-answers-user-row">
                            {answer.user}
                            {answer.content}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}

export default Answers