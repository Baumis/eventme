import React, { Component } from 'react'
import './Main.css'
import { Link } from 'react-router-dom'

class Main extends Component {

    render() {
        return (
            <div className="Main">
                <div className="MainNavbar">

                </div>
                <div className="MainContent">
                    <Link to="/event">
                        <div className="CreateButton">Create event</div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Main