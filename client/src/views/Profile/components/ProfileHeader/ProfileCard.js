import React from 'react'
import { FaUser, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const ProfileCard = ({ user }) => {

    return (
        <div className="profileCard">
            <div className="profileInfo">
                <div>
                    <div className="profileCircle text"><FaUser /></div>
                </div>
                <div className="cardInfo">
                    <div className="cardInfoRow text">
                        <h1>{user.username}</h1>
                    </div>
                    <div className="cardInfoRow text">
                        <p>{user.name}</p>
                    </div>
                    <div className="cardInfoRow text">
                        <FaEnvelope />
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
            <div className="socialRow text">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
            </div>
        </div>
    )
}

export default ProfileCard