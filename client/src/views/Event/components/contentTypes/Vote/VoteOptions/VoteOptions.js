import React from 'react'
import './VoteOptions.css'
import EditableWrapper from '../../../EditableWrapper/EditableWrapper'
import { FaTrash } from 'react-icons/fa'

const VoteOptions = (props) => {

    const borderStyle = props.edit ? 'text-editable-mode' : ''
    return (
        <div className="vote-component-options">
            <div className="vote-component-options-wrapper">
                {props.options.map((option, i) =>
                    <div key={i} className="vote-component-option-container">
                        <div className="vote-component-option-row">
                            {props.edit ?
                                <div className="vote-component-delete-button" onClick={() => props.removeOption(i)}>
                                    <FaTrash />
                                </div>
                                :
                                <div className="vote-component-vote-button" onClick={() => props.setChecked(i)}>
                                    {props.checked === i ?
                                        <div className="vote-component-radio-marker"> </div>
                                        : null
                                    }
                                </div>
                            }
                            <div className={"vote-component-option " + borderStyle}>
                                <EditableWrapper
                                    html={option.content}
                                    editable={!props.edit}
                                    onChange={(event) => props.changeOption(i, event)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {props.edit ?
                <div className="vote-component-add-button" onClick={() => props.newOptions()}>
                    add option
                </div>
                :
                <div className="vote-component-button-row">
                    <div className="vote-component-results-button" onClick={() => props.toggleResults(true)}>
                        results
                    </div> 
                    <div className="vote-component-submit-button" onClick={() => props.submit()}>
                        Submit
                    </div>
                </div>
            }
        </div>
    )
}

export default VoteOptions