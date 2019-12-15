import React from 'react'
import './VoteingOptions.css'
import Spinner from '../../../../../../commonComponents/Spinner/Spinner'

const VoteOptions = (props) => {

    return (
        <div className="vote-component-options">
            <div className="vote-component-options-wrapper">
                {props.options.map((option, i) =>
                    <div key={i} className="vote-component-option-container">
                        <div className="vote-component-option-row">
                            <div className="vote-component-vote-button" onClick={() => props.setChecked(i)}>
                                {props.checked === i ?
                                    <div className="vote-component-radio-marker"> </div>
                                    : null
                                }
                            </div>
                            <div className="vote-component-option ">
                                {option.label}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="vote-component-button-row">
                <div className="vote-component-results-button" onClick={() => props.toggleResults(true)}>
                    Results
                    </div>
                <div className="vote-component-submit-button" onClick={() => props.submit()}>
                    {props.loading ? <Spinner /> : 'Submit'}
                </div>
            </div>
        </div>
    )
}

export default VoteOptions