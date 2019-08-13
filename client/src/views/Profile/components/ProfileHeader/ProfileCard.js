import React from 'react'
import { FaUser, FaFacebook, FaTwitter, FaInstagram, FaCog } from 'react-icons/fa'

const ProfileCard = ({ user, isOwner }) => {

    return (
        <div className="profileCard">
            {isOwner ?
                <div className="profile-card-options-button">
                    <FaCog />
                </div>
                : null
            }
            < div className="profileInfo">
                <div>
                    <div className="profileCircle"><FaUser /></div>
                </div>
                <div className="cardInfo">
                    <div className="cardInfoRow">
                        <h1>{user.name}</h1>
                    </div>
                    <div className="cardInfoRow">
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
            <div className="socialRow">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
            </div>
        </div >
    )
}

export default ProfileCard