import React, { Component } from 'react'
import './Questions.css'

class QuestionField extends Component {

    getContent = (questionId) => {
        const answer = this.props.answerAreas.find(answer => answer.question === questionId)
        return answer ? answer.content : ''
    }

    render() {
        return (
            <div className="form-component-question">
                <div className="form-component-title-row">
                    <div className="form-component-title">
                        {this.props.question.label}
                    </div>
                </div>
                <div>
                    <textarea
                        value={this.getContent(this.props.question._id)}
                        onChange={(event) => this.props.changeAnswer(this.props.question._id, event)}
                        rows={3}
                    />
                </div>
            </div>
        )
    }
}

export default QuestionField