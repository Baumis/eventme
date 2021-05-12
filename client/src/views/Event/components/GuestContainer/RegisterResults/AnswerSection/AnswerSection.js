import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { FaCheck, FaPen, FaTimes } from 'react-icons/fa'
import Spinner from '../../../../../../commonComponents/Spinner/Spinner'
import './AnswerSection.css'
import AvatarPic from '../../../../../../assets/avatar.png'

class AnswerSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editableIndex: null,
            editedValue: '',
            loadingIndex: null
        }
    }

    setEditableIndex = (index, content) => {
        if (index === this.state.editableIndex) {
            this.setState({ editableIndex: null, })
        } else {
            this.setState({ editableIndex: index, editedValue: content })
        }
    }

    editAnswer = (event) => {
        this.setState({ editedValue: event.target.value })
    }

    submitEditedAnswer = async (answer, index) => {
        this.setState({ loadingIndex: index })
        const response = await this.props.EventStore.updateAnswer(answer.registrationId, this.props.question._id, this.state.editedValue)
        this.setState({ loadingIndex: null })

        if (response) {
            this.setState({ editableIndex: null })
        }
    }

    getAvatar = (user) => {
        if (!user.avatar) {
            return { backgroundImage: `url(${AvatarPic})` }
        }
        return { backgroundImage: `url(${user.avatar})` }
    }

    getAnswers = () => {
        const answers = []
        this.props.EventStore.event.registrations.forEach(registration => {
            const answer = registration.answers.find(answer => answer.questionId === this.props.question._id)
            answers.push({
                registrationId: registration._id,
                user: registration.user,
                content: answer ? answer.content : ''
            })
        })
        return answers
    }

    answersToShow = (answers) => {
        if (!this.props.answerAmount) {
            return answers
        }

        return answers.length > this.props.answerAmount ?
            answers.slice(0, this.props.answerAmount)
            :
            answers
    }

    filteredAnswers = (answers) => {
        if (!this.props.filter) {
            return answers
        }

        return answers.filter((answer) =>
            answer.user.name.toLowerCase().includes(this.props.filter.toLowerCase())
        )
    }

    renderContent = (answer, index) => {
        if (this.state.loadingIndex === index) {
            return <div className="answers-user-content"><Spinner /></div>
        }

        if (this.state.editableIndex === index && !this.state.loadingIndex) {
            return (
                <div className="answers-user-content">
                    <input
                        value={this.state.editedValue}
                        onChange={this.editAnswer}
                    />
                </div>
            )
        } else {
            if (!this.props.EventStore.event.publicAnswers && !this.props.isCreator && answer.user._id !== this.props.UserStore.currentUser._id) {
                return (
                    <div className="answers-user-content">
                        <div className="answers-user-content-empty">hidden answer</div>
                    </div>
                )
            }
            return (
                <div className="answers-user-content">
                    {answer.content.length > 0 ? answer.content : <div className="answers-user-content-empty">no answer</div>}
                </div>
            )
        }
    }

    renderEditControls = (answer, index) => {
        if (!this.props.UserStore.currentUser) {
            return
        }

        if (!this.props.isCreator && answer.user._id !== this.props.UserStore.currentUser._id) {
            return
        }

        if (this.state.editableIndex === index) {
            return (<div className="answer-edit-controls">
                <div className="answer-edit-check" onClick={() => this.submitEditedAnswer(answer, index)}>
                    <FaCheck />
                </div>
                <div className="answer-edit" onClick={() => this.setEditableIndex(index, answer.content)}>
                    <FaTimes />
                </div>
            </div>)
        } else {
            return (
                <div className="answer-edit" onClick={() => this.setEditableIndex(index, answer.content)}>
                    <FaPen />
                </div>
            )
        }
    }

    render() {

        if (this.getAnswers().length < 1) {
            return (
                <div className="answer empty-answers">
                    No answers to display.
                </div>
            )
        }

        return (
            <div className="answer-section">
                {this.filteredAnswers(this.answersToShow(this.getAnswers())).map((answer, i) =>
                    <div className="answer" key={i}>
                        <div className="answer-content">
                            <div className="answers-user-info">
                                <div className="answers-user-avatar" style={this.getAvatar(answer.user)}>
                                </div>
                                <div className="answers-user-name">
                                    {answer.user.name}
                                </div>
                            </div>
                            {this.renderContent(answer, i)}
                        </div>
                        {this.renderEditControls(answer, i)}
                    </div>
                )}
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(AnswerSection))