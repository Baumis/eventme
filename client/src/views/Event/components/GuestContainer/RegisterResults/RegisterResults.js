import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './RegisterResults.css'
import { FaChevronRight, FaTrashAlt } from 'react-icons/fa'

class RegisterResults extends Component {

    editQuestion = (event, index) => {
        const eventQuestions = [... this.props.EventStore.event.registrationQuestions]
        eventQuestions[index].data = { content: event.target.value }
        this.props.EventStore.setValue(eventQuestions, 'registrationQuestions')
    }

    askToRemove = (index) => {
        this.props.VisibilityStore.showAlert(
            'Confirm',
            `Do you want to remove this question? You will lose all the answers to the question.`,
            'Remove',
            () => this.removeQuestion(index),
            'Cancel',
            () => this.props.VisibilityStore.closeAlert()
        )
    }

    removeQuestion = (index) => {
        const eventQuestions = [... this.props.EventStore.event.registrationQuestions]
        eventQuestions.splice(index, 1)
        this.props.EventStore.setValue(eventQuestions, 'registrationQuestions')
        this.props.VisibilityStore.closeAlert()
    }

    addQuestion = () => {
        const eventQuestions = [... this.props.EventStore.event.registrationQuestions]
        eventQuestions.push({data:{content: ""}, type: "QUESTION"})
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
                            {this.props.editable ?
                                <div className="remove-question-button" onClick={() => this.askToRemove(i)}>
                                    <FaTrashAlt />
                                </div>
                                :
                                <FaChevronRight />
                            }
                        </div>
                    </div>
                )}
                {this.props.editable && this.props.EventStore.event.registrationQuestions.length < 3 &&
                    <div className="register-results-add-question-row" onClick={this.addQuestion}>
                        <div className="register-results-add-question">
                            +
                        </div> 
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'VisibilityStore')(observer(RegisterResults)))