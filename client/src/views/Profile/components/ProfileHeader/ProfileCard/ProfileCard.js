import React from 'react'
import './ProfileCard.css'

const ProfileCard = (props) => {
    const avatar = {
        backgroundImage: `url(${props.user.avatar})`
    }
    return (
        <div className="profile-row">
            < div className="profile-row-content">
                <div style={avatar} className="profile-avatar"></div>
                <div className="profile-name">
                    <h2>{props.user.name}</h2>
                </div>
            </div>
        </div >
    )
}

export default ProfileCard