import React, { Component } from 'react'
import './FormOptions.css'
import { FaTrash } from 'react-icons/fa'
import DefaultButtons from '../../../../../../commonComponents/UniversalModal/DefaultButtons/DefaultButtons'

class FormOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            component: JSON.parse(JSON.stringify(this.props.component))
        }
    }

    changeQuestion = (optionIndex, event) => {
        const componentClone = { ...this.state.component }
        componentClone.data.questions[optionIndex].label = event.target.value
        this.setState({ component: componentClone })
    }

    addNewQuestion = () => {
        const question = {
            label: 'question',
            answers: []
        }
        const componentClone = { ...this.state.component }
        componentClone.data.questions.push(question)
        this.setState({ component: componentClone })
    }

    removeQuestion = (optionIndex) => {
        const componentClone = { ...this.state.component }
        componentClone.data.questions.splice(optionIndex, 1)
        this.setState({ component: componentClone })
    }

    applyChanges = () => {
        this.props.changeData(this.state.component.data)
        this.props.close()
    }

    render() {
        return (
            <div className="form-options">
                <div className="form-options-header">
                    Vote component
                </div>
                <div className="form-options-container">
                    <div className="form-options-option-list">
                        <div className="form-options-label">Questions</div>
                        {this.state.component.data.questions.map((question, i) =>
                            <div key={i} className="form-options-option">
                                <div className="form-delete-button" onClick={() => this.removeQuestion(i)}>
                                    <FaTrash />
                                </div>
                                <input
                                    value={question.label}
                                    onChange={(event) => this.changeQuestion(i, event)}
                                />
                            </div>
                        )}
                        {this.state.component.data.questions.length < 3 ?
                            <div className="form-component-add-button" onClick={() => this.addNewQuestion()}>
                                add question
                        </div>
                            : null}
                    </div>
                </div>
                <DefaultButtons
                    positiveLabel={'Apply'}
                    negativeLabel={'Close'}
                    positiveAction={this.applyChanges}
                    negativeAction={this.props.close}
                />
            </div>
        )
    }
}

export default FormOptions