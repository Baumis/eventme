import React, { Component } from 'react'
import './AnswerSection.css'
import { FaChevronDown } from 'react-icons/fa'

class AnswerSection extends Component {

    getAvatar = (user) => {
        if (!user.avatar) {
            return null
        }
        return { backgroundImage: `url(${user.avatar})` }
    }

    render() {

        if (!this.props.show) {
            return null
        }

        if (this.props.question.answers.length < 1) {
            return (
                <div className="answer empty-answers">
                    No answers to display.
                </div>)
        }

        return (
            <div className="answer-section">
                {this.props.question.answers.map((answer, i) =>
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

export default AnswerSection