import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Form.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'
import { FaTrash } from 'react-icons/fa'

class Form extends Component {

    newQuestion = () => {
        const question = {
            label: 'question',
        }
        this.props.component.data.questions.push(question)
        this.props.changeData({ ... this.props.component.data })
    }

    removeQuestion = (questionIndex) => {
        this.props.component.data.questions.splice(questionIndex, 1)
        this.props.changeData({ ... this.props.component.data })
    }

    changeQuestion(questionIndex, event) {
        this.props.component.data.questions[questionIndex].content = event.target.value
        this.props.changeData({ ... this.props.component.data })
    }

    render() {
        const borderStyle = this.props.edit ? 'text-editable-mode' : ''
        return (
            <div className="form-component">
                <div className="form-component-questions">
                    {this.props.component.data.questions.map((question, i) =>
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
                                        html={question.content}
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