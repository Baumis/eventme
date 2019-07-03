import React, { Component } from 'react'
import './Navbar.css'
import MainSearchbar from '../mainSearchBar/MainSearchBar'
import User from '../../../../commonComponents/User/User'

class Navbar extends Component {

    render() {
        return (
            <div className="Navbar">
                <div className="companyLogo NavBarItem">
                    <p>EVENTME.COM</p>
                </div>
                <div className="NavBarItem"><MainSearchbar /></div>
                <div className="NavBarItem"><User history={this.props.history}/></div>
            </div>
        )
    }
}

export default Navbar