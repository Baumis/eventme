import React, { Component } from 'react'
import './NotFound.css'
import NavBar from '../../commonComponents/Navbar/Navbar'
import NotFoundMessage from './components/NotFoundMessage/NotFoundMessage'

class NotFound extends Component {
    render() {
        return (
            <div className="NotFound">
                <NavBar />
                <div className="NotFound-container">
                    <NotFoundMessage
                        title={this.props.title}
                        message={this.props.message}
                    />
                </div>
            </div>
        )
    }
}

export default NotFound
