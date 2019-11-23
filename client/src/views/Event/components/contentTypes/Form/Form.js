import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Form.css'
import Questions from './Questions/Questions'

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            answerAreas: [],
            loading: false
        }
    }

    componentDidMount() {
        const answerObjects = this.props.component.data.questions.map(question => {
            const answer = this.getOldAnswerContent(question)
            return { question: question._id, content: answer.content }
        })
        this.setState({ answerAreas: answerObjects })
    }

    syncAnswersWithStore = () => {
        this.props.component.data.questions.forEach(question => {
            if (!this.state.answerAreas.some(answer => answer.question === question._id)) {
                const answerAreasCopy = this.state.answerAreas
                const answer = this.getOldAnswerContent(question)
                answerAreasCopy.push({ question: question._id, content: answer.content })
                this.setState({ answerAreasCopy })
            }
        })
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
        const answerAreasCopy = [ ... this.state.answerAreas ] 
        const answer = answerAreasCopy.find(answer => answer.question === questionId)
        answer.content = event.target.value
        this.setState({ answerAreas: answerAreasCopy })
    }

    submit = async () => {
        this.setState({ loading: true })
        const response = await this.props.EventStore.addAnswersToFormComponent(this.props.component._id, this.state.answerAreas)
        this.setState({ loading: false })

        if (!response) {
            alert('Could not submit. Try again.')
        }
    }

    render() {
        this.syncAnswersWithStore()
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
                />
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Form))