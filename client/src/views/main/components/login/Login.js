import React, { Component } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

class Login extends Component {

    render() {
        return (

            <div className="LoginBackground" >
                <div className="Login">
                    <div className="SkipRow">
                        <div className="Skip">
                            <Link to="/event">{'login later'}</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login