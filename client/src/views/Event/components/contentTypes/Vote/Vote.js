import React from 'react'
import './Vote.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'

const Vote = (props) => {

    const changeSubject = (event) => {
        const dataObject = {
            subject: event.target.value,
            options: props.data.options,
            votes: props.data.votes
        }
        props.changeData(dataObject)
    }

    const changeOption = (event) => {
        const editedOptions = props.data.options
        editedOptions[i] = event.target.value

        const dataObject = {
            subject: props.data.subject,
            options: editedOptions,
            votes: props.data.votes
        }
        props.changeData(dataObject)
    }

    const newOptions = () => {
        const editedOptions = props.data.options
        editedOptions.push('new option')

        const dataObject = {
            subject: props.data.subject,
            options: editedOptions,
            votes: props.data.votes
        }
        props.changeData(dataObject)
    }

    const borderStyle = props.edit ? 'text-editable-mode' : ''
    return (
        <div className="vote-component">
            <div className={"vote-component-subject " + borderStyle}>
                <EditableWrapper
                    html={props.data.content}
                    editable={!props.edit}
                    onChange={changeSubject}
                />
            </div>

            {props.data.options.map((option, i) =>
                <div className="vote-component-option-row">
                    <div className="vote-component-option">
                        <EditableWrapper
                            html={option}
                            index={i}
                            editable={!props.edit}
                            onChange={changeOption}
                        />
                    </div>
                    {props.edit ?
                        <div className="vote-component-delete-button">
                            delete
                        </div>
                        :
                        <div className="vote-component-vote-button">
                            vote
                        </div>
                    }
                </div>
            )}
            {props.edit ?
                <div className="vote-component-delete-button" onClick={() => newOptions()}>
                    add option
                </div>
                :
                null
            }
        </div>
    )
}

export default Vote