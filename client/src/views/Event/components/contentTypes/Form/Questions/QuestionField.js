import React, { Component } from 'react'
import './Questions.css'
import EditableWrapper from '../../../EditableWrapper/EditableWrapper'
import { FaTrash } from 'react-icons/fa'

class QuestionField extends Component {

    componentDidUpdate(){
        this.props.syncAnswersWithStore()
    }

    render() {
        const borderStyle = this.props.edit ? 'text-editable-mode' : ''
        return (
            <div className="form-component-question">
                <div className="form-component-title-row">
                    {this.props.edit ?
                        <div className="form-component-delete-button" onClick={() => this.props.removeQuestion(this.props.index)}>
                            <FaTrash />
                        </div>
                        : null
                    }
                    <div className={"form-component-title " + borderStyle}>
                        <EditableWrapper
                            html={this.props.question.label}
                            editable={!this.props.edit}
                            onChange={(event) => this.props.changeQuestion(this.props.index, event)}
                        />
                    </div>
                </div>
                <div>
                    <textarea
                        value={this.props.getContent(this.props.question._id)}
                        onChange={(event) => this.props.changeAnswer(this.props.question._id, event)}
                    />
                </div>
            </div>
        )
    }
}

export default QuestionField