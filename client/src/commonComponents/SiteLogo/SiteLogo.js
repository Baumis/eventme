import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SiteLogo.css'
import { withRouter } from 'react-router-dom'

class SiteLogo extends Component {

    toMain = () => {
        if(this.props.VisibilityStore.signModal){
            this.props.VisibilityStore.closeSignModal()
        }
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

export default withRouter(inject('VisibilityStore')(observer(SiteLogo)))