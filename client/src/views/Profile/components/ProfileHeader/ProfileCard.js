import React from 'react'
import { FaCog } from 'react-icons/fa'

const ProfileCard = (props) => {
    const avatar = {
        backgroundImage: `url(${props.user.avatar})`
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
                    <div style={avatar} className="profileCircle"></div>
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