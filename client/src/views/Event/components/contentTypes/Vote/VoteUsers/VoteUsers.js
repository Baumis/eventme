import React from 'react'
import './VoteUsers.css'

const VoteUsers = (props) => {

    const getAvatar = (user) => {
        if (!user.avatar) {
            return null
        }
        return { backgroundImage: `url(${user.avatar})` }
    }

    return (
        <div className="vote-users-container">
            <div className="vote-users-option">
                {props.option.label}
            </div>
            <div className="vote-users-user-list">
                {props.option.votes.map((user, i) =>
                    <div key={i} className="vote-users-user">
                        <div className="vote-users-user-avatar" style={getAvatar(user)}>
                        </div>
                        <div className="vote-users-user-name">
                            {user.name}
                        </div>
                    </div>
                )
                }
            </div>
            <div className="vote-users-close-button-row">
                <div className="vote-users-close-button" onClick={() => props.close()}>
                    Close
                </div>
            </div>
        </div>
    )
}

export default VoteUsers