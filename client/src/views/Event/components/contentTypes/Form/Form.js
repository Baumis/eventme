import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Form.css'
import Questions from './Questions/Questions'
import Submitted from './Submitted/Submitted'

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            answerAreas: [],
            loading: false,
            submittedAll: false
        }
    }

    componentDidMount() {
        this.syncAnswersWithStore()
        this.hasSubmittedAll()
    }

    syncAnswersWithStore = () => {
        this.props.component.data.questions.forEach(question => {
            if (!this.state.answerAreas.some(answer => answer.question === question._id)) {
                const answerAreasCopy = this.state.answerAreas
                const answer = this.getOldAnswerContent(question)
                if(question._id){
                    answerAreasCopy.push({ question: question._id, content: answer.content })
                    this.setState({ answerAreasCopy })
                }
            }
        })
    }

    inSync = () => {
        let inSync = true
        this.props.component.data.questions.forEach(question => {
            if (!this.state.answerAreas.some(answer => answer.question === question._id)) {
                inSync = false
            }
        })
        return inSync
    }

    getOldAnswerContent = (question) => {
        if (!this.props.UserStore.currentUser) {
            return { content: '' }
        }

        const userId = this.props.UserStore.currentUser._id
        const oldAnswer = question.answers.find(answer => answer.user === userId)
        return oldAnswer ? oldAnswer : { content: '' }
    }

    newQuestion = () => {
        const question = {
            label: 'question',
            answers: []
        }
        this.props.component.data.questions.push(question)
        this.props.changeData({ ... this.props.component.data })
        this.hasSubmittedAll()
    }

    removeQuestion = (questionIndex) => {
        this.props.component.data.questions.splice(questionIndex, 1)
        this.props.changeData({ ... this.props.component.data })
        this.hasSubmittedAll()
    }

    changeQuestion = (questionIndex, event) => {
        this.props.component.data.questions[questionIndex].label = event.target.value
        this.props.changeData({ ... this.props.component.data })
        this.hasSubmittedAll()
    }

    changeAnswer = (questionId, event) => {
        const answerAreasCopy = [... this.state.answerAreas]
        const answer = answerAreasCopy.find(answer => answer.question === questionId)
        answer.content = event.target.value
        this.setState({ answerAreas: answerAreasCopy })
        this.hasSubmittedAll()
    }

    findEmptyAnswers = () => {
        return this.state.answerAreas.find(answer => answer.content === '')
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

        if (this.findEmptyAnswers()) {
            alert('You can\'t submit empty answers.')
            return
        }

        this.setState({ loading: true })
        const response = await this.props.EventStore.addAnswersToFormComponent(this.props.component._id, this.state.answerAreas)
        this.setState({ loading: false })

        if (!response) {
            alert('Could not submit. Try again.')
        } else {
            this.hasSubmittedAll()
            this.syncAnswersWithStore()
        }
    }

    hasSubmittedAll = () => {
        let hasSubmitted = true
        this.props.component.data.questions.forEach(question => {
            if (!this.getOldAnswerContent(question).content) {
                hasSubmitted = false
            }
        })
        this.setState({ submittedAll: hasSubmitted })
    }

    render() {

        if(!this.inSync()){
            this.syncAnswersWithStore()
        }

        if (this.state.submittedAll && !this.props.edit) {
            return (
                <div className="form-component">
                    <Submitted />
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
                />
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Form))