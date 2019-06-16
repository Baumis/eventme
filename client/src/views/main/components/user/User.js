import React from 'react'
import './User.css'
import { FaUser } from 'react-icons/fa'

const User = (props) => {

    return (
        <div className="UserInfo">
            {props.userLogged
                ? (
                    <div>
                        <div className="UserInfoIcon"><FaUser /></div>
                        <div className="UserInfoName">Simo Häyhä</div>
                    </div>
                ) : (
                    <div>
                        <div className="LoginButton">Sign in</div>
                    </div>
                )
            }
        </div>
    )
}

export default User