import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './RegisterResults.css'
import { FaChevronRight } from 'react-icons/fa'

class RegisterResults extends Component {

    editQuestion = (event, index) => {
        const eventQuestions = [... this.props.EventStore.event.registrationQuestions]
        eventQuestions[index].data = { content: event.target.value }
        this.props.EventStore.setValue(eventQuestions, 'registrationQuestions')
    }

    openAnswerModal = (question) => {
        if (!this.props.editable) {
            this.props.toggleAnswerModal(question)
        }
    }

    render() {
        return (
            <div className="register-results">
                {this.props.EventStore.event.registrationQuestions.map((question, i) =>
                    <div className="register-results-question" key={i}>
                        <div className="register-results-question-button" onClick={() => this.openAnswerModal(question)}>
                            {this.props.editable ?
                                <input
                                    value={question.data.content}
                                    onChange={(event) => this.editQuestion(event, i)}
                                />
                                :
                                <div>{question.data.content}</div>
                            }
                            <FaChevronRight />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(inject('EventStore')(observer(RegisterResults)))