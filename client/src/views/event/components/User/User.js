import React from 'react'
import './User.css'
import { FaUser } from 'react-icons/fa'

const User = () => {

    return (
        <div className="UserPanel">
            <div className="UserIcon"><FaUser /></div>
            <div className="UserName">Simo Häyhä</div>
        </div>
    )
}

export default User