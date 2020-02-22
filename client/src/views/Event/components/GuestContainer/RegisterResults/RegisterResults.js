import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './RegisterResults.css'
import { FaChevronRight } from 'react-icons/fa'
import AnswerSection from './AnswerSection/AnswerSection'

class RegisterResults extends Component {

    render() {
        return (
            <div className="register-results">
                {this.props.EventStore.event.registrationQuestions.map((question, i) =>
                    <div className="register-results-question" key={i}>
                        <div className="register-results-question-button" onClick={() => this.props.toggleAnswerModal(question)}>
                            {question.data.content}
                            <FaChevronRight />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(inject('EventStore')(observer(RegisterResults)))