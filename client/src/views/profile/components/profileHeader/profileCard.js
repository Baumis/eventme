import React from 'react'
import { FaUser, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const profileCard = ({ user }) => {
    return (
        <div className="profileCard">
            <div className="profileInfo">
                <div>
                    <div className="profileCircle"><FaUser /></div>
                </div>
                <div className="cardInfo">
                    <div className="cardInfoRow">
                        <h1>{user.username}</h1>
                    </div>
                    <div className="cardInfoRow">
                        <p>{user.name}</p>
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

export default profileCard