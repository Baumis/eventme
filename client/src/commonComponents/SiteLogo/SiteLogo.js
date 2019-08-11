import React, { Component } from 'react'
import './SiteLogo.css'

class SiteLogo extends Component {

    render() {
        return (
            <div className="site-logo">
                <a href="/" className="site-logo-content">
                    <p>EventKey</p>
                </a>
            </div>
        )
    }
}

export default SiteLogo