import React from 'react'
import { FaUser, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaCog } from 'react-icons/fa'

const ProfileCard = ({ user }) => {

    return (
        <div className="profileCard">
            <div className="profile-card-options-button">
                <FaCog />
            </div>
            <div className="profileInfo">
                <div>
                    <div className="profileCircle"><FaUser /></div>
                </div>
                <div className="cardInfo">
                    <div className="cardInfoRow">
                        <h1>{user.name}</h1>
                    </div>
                    <div className="cardInfoRow">
                        <FaEnvelope />
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
            <div className="socialRow">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
            </div>
        </div>
    )
}

export default ProfileCard