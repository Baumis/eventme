import React from 'react'
import { FaCog } from 'react-icons/fa'

const ProfileCard = (props) => {

    const getAvatar = () => {
        if (!props.user.avatar) {
            return null
        }

        return { backgroundImage: `url(${props.user.avatar})` }
    }

    return (
        <div className="profileCard">
            {props.isOwner ?
                <div className="profile-card-options-button">
                    <div onClick={() => props.toggleOptions()}> <FaCog /> </div>
                </div>
                : null
            }
            < div className="profileInfo">
                <div>
                    <div style={getAvatar()} className="profileCircle"></div>
                </div>
                <div className="cardInfo">
                    <div className="cardInfoRow">
                        <h1>{props.user.name}</h1>
                    </div>
                    <div className="cardInfoRow">
                        <p>{props.user.email}</p>
                    </div>
                </div>
            </div>
            <div className="socialRow">
            </div>
        </div >
    )
}

export default ProfileCard