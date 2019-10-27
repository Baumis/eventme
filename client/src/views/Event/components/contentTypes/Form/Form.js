import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Form.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'
import { FaTrash } from 'react-icons/fa'

class Form extends Component {

    newQuestion = () => {
        const editedQuestions = this.props.data.questions
        editedQuestions.push({ question: 'new question' })

        const dataObject = {
            questions: editedQuestions,
        }
        this.props.changeData(dataObject)
    }

    removeQuestion = (optionIndex) => {
        const editedQuestions = this.props.data.questions
        editedQuestions.splice(optionIndex, 1)

        const dataObject = {
            questions: editedQuestions,
        }
        this.props.changeData(dataObject)
    }

    changeQuestion(index, event) {
        const editedQuestions = this.props.data.questions
        editedQuestions[index].question = event.target.value

        const dataObject = {
            questions: editedQuestions,
        }
        this.props.changeData(dataObject)
    }

    render() {
        const borderStyle = this.props.edit ? 'text-editable-mode' : ''
        return (
            <div className="form-component">
                <div className="form-component-questions">
                    {this.props.data.questions.map((question, i) =>
                        <div key={i} className="form-component-question">
                            <div className="form-component-title-row">
                                {this.props.edit ?
                                    <div className="form-component-delete-button" onClick={() => this.removeQuestion(i)}>
                                        <FaTrash />
                                    </div>
                                    : null
                                }
                                <div className={"form-component-title " + borderStyle}>
                                    <EditableWrapper
                                        html={question.question}
                                        editable={!this.props.edit}
                                        onChange={(event) => this.changeQuestion(i, event)}
                                    />
                                </div>
                            </div>
                            <div>
                                <textarea />
                            </div>
                        </div>
                    )}
                </div>
                {this.props.edit ?
                    <div className="form-component-add-button" onClick={() => this.newQuestion()}>
                        add question
                        </div>
                    :
                    <div className="form-component-submit-button">
                        Submit
                        </div>
                }
            </div>
        )
    }
}

export default inject('UserStore')(observer(Form))