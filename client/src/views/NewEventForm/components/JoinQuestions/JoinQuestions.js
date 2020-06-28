import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './JoinQuestions.css'
import CreateInput from '../../../../commonComponents/CreateEventForm/CreateInput/CreateInput'
import { FaTrash } from 'react-icons/fa'

class JoinQuestions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    changeQuestion = (event, index) => {
        const questionsClone = [... this.props.questions]
        questionsClone[index].data.content = event.target.value
        this.props.setGuestQuestions(questionsClone)
    }

    addNewQuestion = () => {
        if (this.props.questions.length < 3) {
            const questionsClone = [... this.props.questions]
            questionsClone.push({
                type: 'QUESTION',
                data: {
                    content: ''
                }
            })
            this.props.setGuestQuestions(questionsClone)
        }
    }

    removeQuestion = (index) => {
        const questionsClone = [... this.props.questions]
        questionsClone.splice(index, 1)
        this.props.setGuestQuestions(questionsClone)
    }

    getButtonClass = () => {
        return this.props.questions.length < 3 ? '' : ' add-question-disabled'
    }

    render() {
        return (
            <div className="join-questions">
                <div className="join-questions-description">
                    <div className="join-questions-description-title">
                        Ask your guests
                    </div>
                    Write questions that guests can answer when registering for the event.
                </div>
                <div className="join-questions-questions">
                    {this.props.questions.map((question, i) =>
                        <div key={i} className="join-questions-question">
                            <div className="join-questions-question-input">
                                <CreateInput
                                    label={`Question ${i + 1}`}
                                    type={'text'}
                                    value={question.data.content}
                                    placeholder={'Write a question'}
                                    onChange={(event) => this.changeQuestion(event, i)}
                                />
                            </div>
                            <div className="join-questions-question-icon" onClick={() => this.removeQuestion(i)}>
                                < FaTrash />
                            </div>
                        </div>
                    )}
                </div>
                <div className="join-questions-add-buttons">
                    <div className={"join-questions-add-question " + this.getButtonClass()} onClick={this.addNewQuestion}>
                        Add question
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(JoinQuestions)))