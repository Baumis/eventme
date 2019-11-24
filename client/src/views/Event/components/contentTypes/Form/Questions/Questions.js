import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Questions.css'
import QuestionField from './QuestionField'
import Spinner from '../../../../../../commonComponents/Spinner/Spinner'

class Questions extends Component {

    render() {
        return (
            <div className="form-component-questions">
                <div className="form-component-question-area">
                    {this.props.component.data.questions.map((question, i) =>
                        <QuestionField
                            question={question}
                            key={i}
                            index={i}
                            edit={this.props.edit}
                            changeAnswer={this.props.changeAnswer}
                            changeQuestion={this.props.changeQuestion}
                            newQuestion={this.props.newQuestion}
                            removeQuestion={this.props.removeQuestion}
                            answerAreas={this.props.answerAreas}
                            syncAnswersWithStore={this.props.syncAnswersWithStore}
                        />
                    )}
                </div>
                {this.props.edit ?
                    <div className="form-component-add-button" onClick={() => this.props.newQuestion()}>
                        add question
                        </div>
                    :
                    <div className="form-component-button-row">
                        {this.props.isCreator() ?
                            <div className="form-component-answers-button" onClick={() => this.props.toggleAnswers()}>
                                Answers
                            </div>
                            : null}
                        <div className="form-component-submit-button" onClick={() => this.props.submit()}>
                            {this.props.loading ? <Spinner /> : 'Submit'}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default inject('EventStore', 'UserStore')(observer(Questions))