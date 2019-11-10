import React from 'react'
import './VoteResults.css'
import { FaChevronLeft } from 'react-icons/fa'

const VoteResults = (props) => {

    const votePercentage = (id) => {
        const allVotes = props.votes.length
        const targetVoteCount = voteCount(id)
        return (targetVoteCount / allVotes) * 100
    }

    const voteCount = (id) => {
        const votes = props.votes.filter(vote => vote.optionId === id)
        return votes.length
    }

    return (
        <div className="vote-component-results">
            {props.options.map((option, i) =>
                <div key={i} className="vote-component-option-container">
                    <div className="vote-component-title-row">
                        <div className={"vote-component-title"}>
                            <div>{option.content}</div>
                            <div className="vote-component-vote-count">{voteCount(option._id) + ' votes'}</div>
                        </div>
                    </div>
                    <div className="vote-component-status-bar">
                        <div style={{ width: votePercentage(option._id) + '%' }} className="vote-component-status-filler" />
                    </div>
                </div>
            )}
            <div className="vote-component-button-row">
                <div className="vote-component-back-button" onClick={() => props.toggleResults(false)}>
                    < FaChevronLeft />
                    {'vote'}
                </div>
            </div>
        </div>
    )
}

export default VoteResults 