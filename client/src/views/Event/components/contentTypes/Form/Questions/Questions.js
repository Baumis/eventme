import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Questions.css'
import EditableWrapper from '../../../EditableWrapper/EditableWrapper'
import Spinner from '../../../../../../commonComponents/Spinner/Spinner'
import { FaTrash } from 'react-icons/fa'

class Questions extends Component {

    render() {
        const borderStyle = this.props.edit ? 'text-editable-mode' : ''
        return (
            <div className="form-component-questions">
                <div className="form-component-question-area">
                    {this.props.component.data.questions.map((question, i) =>
                        <div key={i} className="form-component-question">
                            <div className="form-component-title-row">
                                {this.props.edit ?
                                    <div className="form-component-delete-button" onClick={() => this.removeQuestion(i)}>
                                        <FaTrash />
                                    </div>
                                    : null
                                }
                                <div className={"form-component-title " + borderStyle}>
                                    <EditableWrapper
                                        html={question.label}
                                        editable={!this.props.edit}
                                        onChange={(event) => this.props.changeQuestion(i, event)}
                                    />
                                </div>
                            </div>
                            <div>
                                <textarea
                                    value={this.props.answerAreas.find(answer => answer.question === question._id).content}
                                    onChange={(event) => this.props.changeAnswer(question._id, event)}
                                />
                            </div>
                        </div>
                    )}
                </div>
                {this.props.edit ?
                    <div className="form-component-add-button" onClick={() => this.props.newQuestion()}>
                        add question
                        </div>
                    :
                    <div className="form-component-submit-button" onClick={() => this.props.submit()}>
                        {this.props.loading ? <Spinner /> : 'Submit'}
                    </div>
                }
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Questions))