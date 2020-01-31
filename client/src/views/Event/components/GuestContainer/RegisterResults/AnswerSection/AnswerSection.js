import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './AnswerSection.css'

class AnswerSection extends Component {

    getAvatar = (user) => {
        if (!user.avatar) {
            return null
        }
        return { backgroundImage: `url(${user.avatar})` }
    }

    getAnswers = () => {
        const answers = []
        this.props.EventStore.event.registrations.forEach(registration => {
            const answer = registration.answers.find(answer => answer.questionId === this.props.question._id)
            if (answer) {
                answers.push({
                    user: registration.user,
                    content: answer.content
                })
            }
        })
        return answers
    }

    render() {

        if (!this.props.show) {
            return null
        }

        if (this.getAnswers().length < 1) {
            return (
                <div className="answer empty-answers">
                    No answers to display.
                </div>)
        }

        return (
            <div className="answer-section">
                {this.getAnswers().map((answer, i) =>
                    <div className="answer" key={i}>
                        <div className="answers-user-info">
                            <div className="answers-user-avatar" style={this.getAvatar(answer.user)}>
                            </div>
                            <div className="answers-user-name">
                                {answer.user.name}
                            </div>
                        </div>
                        <div className="answers-user-content">
                            {answer.content}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default inject('EventStore')(observer(AnswerSection))