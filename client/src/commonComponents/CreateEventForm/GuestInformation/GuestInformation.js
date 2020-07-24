import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './GuestInformation.css'
import CreateInput from '../CreateInput/CreateInput'
import DefaultButtons from '../../UniversalModal/DefaultButtons/DefaultButtons'
import { FaTrash } from 'react-icons/fa'

class GuestInformation extends Component {
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
        if (this.props.questions.length < 4) {
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
        return this.props.questions.length < 4 ? '' : ' add-question-disabled'
    }

    render() {
        return (
            <div className="guest-information">
                <div className="guest-information-description">
                    <div className="guest-information-description-title">
                        Ask your guests.
                    </div>
                    Write questions for your guests.
                </div>
                <div className="guest-information-questions">
                    {this.props.questions.map((question, i) =>
                        <div key={i} className="guest-information-question">
                            <CreateInput
                                label={''}
                                type={'text'}
                                value={question.data.content}
                                placeholder={'Write a question'}
                                onChange={(event) => this.changeQuestion(event, i)}
                            />
                            <div className="guest-information-question-icon" onClick={() => this.removeQuestion(i)}>
                                < FaTrash />
                            </div>
                        </div>
                    )}
                </div>
                <div className="guest-information-add-buttons">
                    <div className={"guest-information-add-question " + this.getButtonClass()} onClick={this.addNewQuestion}>
                        Add question
                    </div>
                </div>
                <div className="guest-information-button-row">
                    <div className="guest-information-status">
                        {`2/2`}
                    </div>
                    <DefaultButtons
                        positiveLabel={'Create'}
                        negativeLabel={'back'}
                        positiveAction={() => this.props.create()}
                        negativeAction={() => this.props.changePage(1)}
                        showSpinner={this.state.loading}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(GuestInformation)))