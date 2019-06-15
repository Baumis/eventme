import React, { Component } from 'react'
import './Navbar.css'
import MainSearchbar from '../mainSearchBar/MainSearchBar'
import User from '../user/User'

class Navbar extends Component {

    render() {
        return (
            <div className="Navbar">
                <div className="companyLogo">
                    <p>EVENTME.COM</p>
                </div>
                <MainSearchbar />
                <User />
            </div>
        )
    }
}

export default Navbar