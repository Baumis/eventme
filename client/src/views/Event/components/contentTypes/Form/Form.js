import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import './Form.css'
import Questions from './Questions/Questions'
import Submitted from './Submitted/Submitted'
import Answers from './Answers/Answers'

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            answerAreas: [],
            loading: false,
            showAnswers: false
        }
    }

    componentDidMount() {
        const answerAreasCopy = [... this.state.answerAreas]
        this.props.component.data.questions.forEach(question => {

            if (!this.state.answerAreas.some(answer => answer.question === question._id)) {
                const answer = this.getOldAnswerContent(question)
                answerAreasCopy.push({ question: question._id, content: answer })
            }

        })
        this.setState({ answerAreas: answerAreasCopy })
    }

    addIdToAnswerAreas = async (questionId) => {
        const answerAreasCopy = this.state.answerAreas.slice()
        answerAreasCopy.push({ question: questionId, content: '' })
        this.setState({ answerAreas: answerAreasCopy })
    }

    getOldAnswerContent = (question) => {
        if (!this.props.UserStore.currentUser) {
            return ''
        }

        const userId = this.props.UserStore.currentUser._id
        const oldAnswer = question.answers.find(answer => answer.user._id === userId)
        return oldAnswer ? oldAnswer.content : ''
    }

    newQuestion = () => {
        const question = {
            label: 'question',
            answers: []
        }
        this.props.component.data.questions.push(question)
        this.props.changeData({ ... this.props.component.data })
    }

    removeQuestion = (questionIndex) => {
        this.props.component.data.questions.splice(questionIndex, 1)
        this.props.changeData({ ... this.props.component.data })
    }

    changeQuestion = (questionIndex, event) => {
        this.props.component.data.questions[questionIndex].label = event.target.value
        this.props.changeData({ ... this.props.component.data })
    }

    changeAnswer = (questionId, event) => {
        if (!questionId) {
            alert('Save event before answering.')
            return
        }

        const answerAreasCopy = [... this.state.answerAreas]
        if (!answerAreasCopy.find(answer => answer.question === questionId)) {
            answerAreasCopy.push({ question: questionId, content: '' })
        }

        const answer = answerAreasCopy.find(answer => answer.question === questionId)
        answer.content = event.target.value
        this.setState({ answerAreas: answerAreasCopy })
    }

    hasEmptyAnswers = () => {
        for (let question of this.props.component.data.questions) {
            const answer = this.state.answerAreas.find(answer => answer.question === question._id)
            if (!answer || answer.content === '') {
                return true
            }
        }
        return false
    }

    submit = async () => {
        if (!this.props.EventStore.saved) {
            alert('Save the event before submitting.')
            return
        }

        if (!this.props.isGuest()) {
            alert('You have to join the event to submit.')
            return
        }

        if (this.hasEmptyAnswers()) {
            alert('You can\'t submit empty answers.')
            return
        }

        this.setState({ loading: true })
        const response = await this.props.EventStore.addAnswersToFormComponent(this.props.component._id, this.state.answerAreas)
        this.setState({ loading: false })

        if (!response) {
            alert('Could not submit. Try again.')
        }
    }

    hasSubmittedAll = () => {
        let hasSubmitted = true
        this.props.component.data.questions.forEach(question => {
            if (!this.getOldAnswerContent(question)) {
                hasSubmitted = false
            }
        })
        return hasSubmitted
    }

    toggleAnswers = () => {
        this.setState({ showAnswers: !this.state.showAnswers })
    }

    render() {
        if (this.state.showAnswers && this.props.isCreator() && !this.props.edit) {
            return (
                <div className="form-component">
                    <Answers
                        toggleAnswers={this.toggleAnswers}
                        component={this.props.component}
                    />
                </div>
            )
        }

        if (this.hasSubmittedAll() && !this.props.edit) {
            return (
                <div className="form-component">
                    <Submitted
                        toggleAnswers={this.toggleAnswers}
                        isCreator={this.props.isCreator}
                    />
                </div>
            )
        }

        return (
            <div className="form-component">
                <Questions
                    component={this.props.component}
                    loading={this.state.loading}
                    answerAreas={this.state.answerAreas}
                    edit={this.props.edit}
                    changeAnswer={this.changeAnswer}
                    submit={this.submit}
                    changeQuestion={this.changeQuestion}
                    newQuestion={this.newQuestion}
                    removeQuestion={this.removeQuestion}
                    toggleAnswers={this.toggleAnswers}
                    isCreator={this.props.isCreator}
                    syncAnswersWithStore={this.syncAnswersWithStore}
                />
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Form))