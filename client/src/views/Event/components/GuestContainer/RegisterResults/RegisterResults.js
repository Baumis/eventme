import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './RegisterResults.css'
import { FaChevronDown } from 'react-icons/fa'
import AnswerSection from './AnswerSection/AnswerSection'

class RegisterResults extends Component {

    render() {
        return (
            <div className="register-results">
                {this.props.EventStore.questions.map((question, i) =>
                    <div className="register-results-question" key={i}>
                        <div className="register-results-question-button">
                            {question.content}
                            <FaChevronDown />
                        </div>
                        <AnswerSection
                            question={question}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(inject('EventStore')(observer(RegisterResults)))