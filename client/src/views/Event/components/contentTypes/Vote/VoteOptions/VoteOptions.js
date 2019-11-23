import React from 'react'
import './VoteOptions.css'
import EditableWrapper from '../../../EditableWrapper/EditableWrapper'
import { FaTrash } from 'react-icons/fa'
import Spinner from '../../../../../../commonComponents/Spinner/Spinner'

const VoteOptions = (props) => {

    const borderStyle = props.edit ? 'text-editable-mode' : ''
    return (
        <div className="vote-component-options">
            <div className="vote-component-options-wrapper">
                {props.options.map((option, i) =>
                    <div key={i} className="vote-component-option-container">
                        <div className="vote-component-option-row">
                            {props.edit ?
                                <div className="vote-component-delete-button" onClick={() => props.removeOption(option._id)}>
                                    <FaTrash />
                                </div>
                                :
                                <div className="vote-component-vote-button" onClick={() => props.setChecked(option._id)}>
                                    {props.checked === option._id ?
                                        <div className="vote-component-radio-marker"> </div>
                                        : null
                                    }
                                </div>
                            }
                            <div className={"vote-component-option " + borderStyle}>
                                <EditableWrapper
                                    html={option.label}
                                    editable={!props.edit}
                                    onChange={(event) => props.changeOption(option._id, event)}
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
                        Results
                    </div> 
                    <div className="vote-component-submit-button" onClick={() => props.submit()}>
                        {props.loading ? <Spinner/> : 'Submit'}
                    </div>
                </div>
            }
        </div>
    )
}

export default VoteOptions