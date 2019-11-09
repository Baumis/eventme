import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Form.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'
import { FaTrash } from 'react-icons/fa'

class Form extends Component {

    newQuestion = () => {
        const question = {
            content: 'title',
            _id: this.generateUUIDv4()
        }
        this.props.component.data.questions.push(question)
        this.props.changeData({ ... this.props.component.data })
    }

    removeQuestion = (optionIndex) => {
        this.props.component.data.questions.splice(optionIndex, 1)
        this.props.changeData({ ... this.props.component.data })
    }

    changeQuestion(index, event) {
        this.props.component.data.questions[index].content = event.target.value
        this.props.changeData({ ... this.props.component.data })
    }

    generateUUIDv4 = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
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