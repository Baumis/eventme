import React, { Component } from 'react'
import './AnswerSection.css'
import { FaChevronDown } from 'react-icons/fa'

class AnswerSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false
        }
    }

    toggleDisplay = () => {
        this.setState({ display: !this.state.display })
    }

    render() {

        if (!this.state.display) {
            return null
        }

        return (
            <div className="answer-section">
                {this.props.question.answers.map((answer, i) =>
                    <div className="answer">
                        {answer.content}
                    </div>
                )}
            </div>
        )
    }
}

export default AnswerSection