import React from 'react'
import './ProfileCard.css'
import AvatarPic from '../../../../../assets/avatar.png'

const ProfileCard = (props) => {

    const getAvatar = () => {
        if (!props.user.avatar) {
            return { backgroundImage: `url(${AvatarPic})` }
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