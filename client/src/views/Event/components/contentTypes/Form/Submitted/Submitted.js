import React from 'react'
import './Submitted.css'
import QuestionField from '../Questions/QuestionField'

const Submitted = (props) => {

    const getContent = (questionId) => {
        const answer = props.answerAreas.find(answer => answer.question === questionId)
        return answer ? answer.content : ''
    }

    return (
        <div className="form-component-submitted">
            {props.component.data.questions.map((question, i) =>
                <div className="form-component-submitted-option" key={i}>
                    <div className={"form-component-submitted-title"}>
                        {question.label}
                        <div className="form-component-submitted-submitted">
                        submitted
                        </div>
                    </div>
                    <div className={"form-component-submitted-textarea"}>
                        <textarea
                            value={getContent(question._id)}
                            rows={3}
                            readOnly
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Submitted