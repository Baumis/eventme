import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Form.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'
import { FaTrash } from 'react-icons/fa'

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            answerAreas: []
        }
    }

    componentDidMount() {
        const answerObjects = this.props.component.data.questions.map(question => {
            const answer = this.getOldAnswerContent(question._id)
            return { _id: question._id, content: answer.content }
        })
        this.setState({ answerAreas: answerObjects })
    }

    syncAnswersWithStore = () => {
        this.props.component.data.questions.forEach(question => {
            if (!this.state.answerAreas.some(answer => answer._id === question._id)) {
                const answerAreasCopy = this.state.answerAreas
                const answer = this.getOldAnswerContent(question._id)
                answerAreasCopy.push({ _id: question._id, content: answer.content })
                this.setState({ answerAreasCopy })
            }
        })
    }

    getOldAnswerContent = (id) => {
        const oldAnswer = this.props.component.data.answers.find(answer => answer._id === id)
        return oldAnswer ? oldAnswer : { content: '' }
    }

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

    changeAnser(questionId, event) {
        const answerAreasCopy = this.state.answerAreas
        const answer = answerAreasCopy.find(answer => answer._id === questionId)
        answer.content = event.target.value
        this.setState({ answerAreas: answerAreasCopy })
        console.log(this.state.answerAreas)
    }

    render() {
        this.syncAnswersWithStore()
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
                                        html={question.label}
                                        editable={!this.props.edit}
                                        onChange={(event) => this.changeQuestion(i, event)}
                                    />
                                </div>
                            </div>
                            <div>
                                <textarea
                                    value={this.state.answerAreas.find(answer => answer._id === question._id).content}
                                    onChange={(event) => this.changeAnser(question._id, event)}
                                />
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