import React, { Component } from 'react'
import './Vote.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'

class Vote extends Component {

    changeSubject = (event) => {
        const dataObject = {
            subject: event.target.value,
            options: this.props.data.options,
        }
        this.props.changeData(dataObject)
    }

    changeOption = (optionIndex, event) => {
        const editedOptions = this.props.data.options
        editedOptions[optionIndex].content = event.target.value

        const dataObject = {
            subject: this.props.data.subject,
            options: editedOptions,
        }
        this.props.changeData(dataObject)
    }

    newOptions = () => {
        const editedOptions = this.props.data.options
        editedOptions.push({ content: 'new option', votes: [] })

        const dataObject = {
            subject: this.props.data.subject,
            options: this.props.data.options,
        }
        this.props.changeData(dataObject)
    }

    render() {
        const borderStyle = this.props.edit ? 'text-editable-mode' : ''
        return (
            <div className="vote-component">
                <div className={"vote-component-subject " + borderStyle}>
                    <EditableWrapper
                        html={this.props.data.subject}
                        editable={!this.props.edit}
                        onChange={this.changeSubject}
                    />
                </div>

                {this.props.data.options.map((option, i) =>
                    <div className="vote-component-option-container">
                        <div className="vote-component-option-row">
                            {this.props.edit ?
                                <div className="vote-component-delete-button">

                                </div>
                                :
                                <div className="vote-component-vote-button">

                                </div>
                            }
                            <div className={"vote-component-option " + borderStyle}>
                                <EditableWrapper
                                    html={option.content}
                                    editable={!this.props.edit}
                                    onChange={(event) => this.changeOption(i, event)}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {this.props.edit ?
                    <div className="vote-component-add-button" onClick={() => this.newOptions()}>
                        add option
                </div>
                    :
                    <div className="vote-component-submit-button" onClick={() => this.newOptions()}>
                        Submit
                </div>
                }
            </div>
        )
    }
}

export default Vote