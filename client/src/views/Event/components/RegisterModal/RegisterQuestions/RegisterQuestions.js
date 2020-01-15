import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './RegisterQuestions.css'

class RegisterQuestions extends Component {

    render() {
        return (
            <div className="register-questions">
                <div className="unsigned-user-title">
                    Leave a response to the organizer's questions
                </div>
                {this.props.EventStore.questions.map(question =>
                    <div className="register-questions-question">
                        <div className="register-questions-title-row">
                            <div className="register-questions-title">
                                {question.content}
                            </div>
                        </div>
                        <div className="register-questions-textarea">
                            <textarea
                                rows={3}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default inject('EventStore')(observer(RegisterQuestions))