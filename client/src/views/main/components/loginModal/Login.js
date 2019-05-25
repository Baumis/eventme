import React from 'react'

const Login = () => {

    return (
        <div className="LoginModalContent">
            <div className="LoginInput">
                <label>Username</label>
                <input></input>
            </div>
            <div className="LoginInput">
                <label>Password</label>
                <input></input>
            </div>
            <div className="LoginButtonRow">
                <div className="LoginButton">login</div>
            </div>
        </div>
    )
}

export default Login