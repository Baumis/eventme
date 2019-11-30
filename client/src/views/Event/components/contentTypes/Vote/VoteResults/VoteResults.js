import React from 'react'
import './VoteResults.css'

const VoteResults = (props) => {

    const votePercentage = (id) => {
        let allVotes = 0
        for (let option of props.options) {
            allVotes += option.votes.length
        }
        const targetVoteCount = voteCount(id)
        return (targetVoteCount / allVotes) * 100
    }

    const voteCount = (optionId) => {
        const option = props.options.find(option => option._id === optionId)
        return option.votes.length
    }

    return (
        <div className="vote-component-results">
            {props.options.map((option, i) =>
                <div key={i} className="vote-component-option-container">
                    <div className="vote-component-title-row">
                        <div className={"vote-component-title"}>
                            <div>{option.label}</div>
                            <div className="vote-component-vote-count">{option.votes.length + ' votes'}</div>
                        </div>
                    </div>
                    <div className="vote-component-status-bar">
                        <div style={{ width: votePercentage(option._id) + '%' }} className="vote-component-status-filler" />
                    </div>
                </div>
            )}
            <div className="vote-component-button-row">
                <div className="vote-component-back-button" onClick={() => props.toggleResults(false)}>
                    {'Vote'}
                </div>
            </div>
        </div>
    )
}

export default VoteResults 