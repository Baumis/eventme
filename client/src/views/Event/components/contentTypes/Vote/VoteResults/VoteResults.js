import React from 'react'
import './VoteResults.css'

const VoteResults = (props) => {

    const votePercentage = (index) => {
        let allVotes = 0
        props.options.forEach(option => {
            allVotes += option.votes.length
        })

        const targetVoteCount = voteCount(index)
        return (targetVoteCount / allVotes) * 100
    }

    const voteCount = (index) => {
        const votes = props.options[index].votes
        return votes.length
    }

    return (
        <div>
            {props.options.map((option, i) =>
                <div key={i} className="vote-component-option-container">
                    <div className="vote-component-title-row">
                        <div className={"vote-component-title"}>
                            <div>{option.content}</div>
                            <div className="vote-component-vote-count">{voteCount(i) + ' votes'}</div>
                        </div>
                    </div>
                    <div className="vote-component-status-bar">
                        <div style={{ width: votePercentage(i) + '%' }} className="vote-component-status-filler" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default VoteResults 