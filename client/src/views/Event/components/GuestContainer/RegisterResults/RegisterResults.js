import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './RegisterResults.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import AnswerSection from './AnswerSection/AnswerSection'

class RegisterResults extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displayedAnswers: []
        }
    }

    toggleAnswer = (id) => {
        if (this.state.displayedAnswers.includes(id)) {
            this.setState({ displayedAnswers: this.state.displayedAnswers.filter(answerId => answerId !== id) })
        } else {
            this.setState({ displayedAnswers: [... this.state.displayedAnswers, id] })
        }
    }

    render() {
        return (
            <div className="register-results">
                {this.props.EventStore.questions.map((question, i) =>
                    <div className="register-results-question" key={i}>
                        <div className="register-results-question-button" onClick={() => this.toggleAnswer(i)}>
                            {question.content}
                            {this.state.displayedAnswers.includes(i) ?
                                <FaChevronUp />
                                :
                                <FaChevronDown />
                            }
                        </div>
                        <AnswerSection
                            question={question}
                            show={this.state.displayedAnswers.includes(i)}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(inject('EventStore')(observer(RegisterResults)))