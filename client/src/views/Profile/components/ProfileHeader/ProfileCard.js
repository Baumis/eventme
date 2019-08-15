import React from 'react'
import { FaUser, FaFacebook, FaTwitter, FaInstagram, FaCog } from 'react-icons/fa'
import { propTypes } from 'mobx-react';

const ProfileCard = (props) => {
    const avatar = {
        backgroundImage: `url(${props.user.avatar})`
    }
    return (
        <div className="profileCard">
            {props.isOwner ?
                <div className="profile-card-options-button" onClick={() => props.toggleOptions()}>
                    <FaCog />
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
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
            </div>
        </div >
    )
}

export default ProfileCard