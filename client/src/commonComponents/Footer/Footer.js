import React, { Component } from 'react'
import './Footer.css'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'

class Footer extends Component {

    toPrivacy = () => {
        if (this.props.VisibilityStore.signModal) {
            this.props.VisibilityStore.closeSignModal()
        }
        this.props.history.push(`/privacy`)
    }

    render() {
        return (
            <div className="footer">
                <div className="footer-container">
                    <div className="footer-item">
                        <div className="footer-item-icon">
                            <FaEnvelope />
                        </div>
                        support@inviteowl.com
                </div>
                    <div className="footer-item">
                        <div onClick={() => this.toPrivacy()}>
                            Privacy Policy
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(inject('VisibilityStore')(observer(Footer)))