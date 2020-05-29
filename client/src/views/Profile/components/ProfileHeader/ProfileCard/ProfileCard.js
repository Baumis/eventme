import React from 'react'
import './ProfileCard.css'

const ProfileCard = (props) => {

    const getAvatar = () => {
        if (!props.user.avatar) {
            return { backgroundImage: `url(${require('../../../../../assets/avatar.png')})` }
        }
        return (
            { backgroundImage: `url(${props.user.avatar})` }
        )
    }

    return (
        <div className="profile-row">
            < div className="profile-row-content">
                <div style={getAvatar()} className="profile-avatar"></div>
                <div className="profile-name">
                    <h2>{props.user.name}</h2>
                </div>
            </div>
        </div >
    )
}

export default ProfileCard