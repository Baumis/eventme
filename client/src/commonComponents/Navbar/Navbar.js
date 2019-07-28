import React, { Component } from 'react'
import './Navbar.css'
import User from '../User/User'
import SiteLogo from '../SiteLogo/SiteLogo'

class Navbar extends Component {

    render() {
        return (
            <div className="Navbar">
                <div className="NavBarItem">
                    <SiteLogo />
                </div>
                <div className="NavBarItem"><User /></div>
            </div>
        )
    }
}

export default Navbar