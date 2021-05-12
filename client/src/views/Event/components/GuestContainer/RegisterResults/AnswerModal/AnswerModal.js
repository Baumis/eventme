import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './AnswerModal.css'
import AnswerSection from '../AnswerSection/AnswerSection'

class AnswerModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: ''
        }
    }

    changeFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {

        return (
            <div className="answer-modal">
                <div className="answer-modal-top-bar">
                    <div className="answer-modal-back-button" onClick={() => this.props.toggleAnswerModal(null)}>
                        Close
                    </div>
                </div>
                <div className="answer-modal-question">
                    {this.props.question.data.content}
                </div>
                {this.props.EventStore.event.publicAnswers || this.props.isCreator() ?
                    <div className="answer-modal-search">
                        <input
                            value={this.state.filter}
                            placeholder={'Filter by name'}
                            onChange={this.changeFilter}
                        />
                    </div>
                    : null}
                <AnswerSection
                    isCreator={this.props.isCreator()}
                    question={this.props.question}
                    filter={this.state.filter}
                />
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(AnswerModal)))