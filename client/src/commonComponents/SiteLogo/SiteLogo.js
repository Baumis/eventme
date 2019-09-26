import React, { Component } from 'react'
import './SiteLogo.css'
import { withRouter } from 'react-router-dom'

class SiteLogo extends Component {

    toMain = () => {
        this.props.history.push(`/`)
    }

    render() {
        return (
            <div className="site-logo">
                <div onClick={() => this.toMain()}>
                    <p>InviteOwl</p>
                </div>
            </div>
        )
    }
}

export default withRouter(SiteLogo)