import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './RegisterQuestion.css'
import DefaultButtons from '../../../../../commonComponents/UniversalModal/DefaultButtons/DefaultButtons'

class RegisterQuestion extends Component {

    changeAnswer = (event) => {
        this.props.answerQuestion(this.props.id, event.target.value)
    }

    render() {
        return (
            <div className="register-questions">
                <div className="register-questions-question">
                    <div className="register-questions-index">
                        {`Step ${this.props.index + 1}/${this.props.EventStore.event.registrationQuestions.length + 1}`}
                    </div>
                    <div className="register-questions-title-row">
                        <div className="register-questions-title">
                            {this.props.question.content}
                        </div>
                    </div>
                    <div className="register-questions-textarea">
                        <textarea
                            rows={6}
                            onChange={this.changeAnswer}
                            value={this.props.value}
                        />
                    </div>
                </div>
                <DefaultButtons
                    positiveLabel={'Next'}
                    positiveAction={() => this.props.setStep(this.props.index + 1)}
                    negativeLabel={'back'}
                    negativeAction={this.props.index === 0 ? null : () => this.props.setStep(this.props.index - 1)}
                />
            </div>
        )
    }
}

export default inject('EventStore')(observer(RegisterQuestion))