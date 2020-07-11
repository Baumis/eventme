import React, { Component } from 'react'
import './PrivacyPolicy.css'
import { inject, observer } from 'mobx-react'
import NavBar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import Alert from '../../commonComponents/Alert/Alert'
import TextContainer from './components/TextContainer/TextContainer'
import PrivacyPolicyText from './components/InviteOwlPrivayPolicy/InviteOwlPrivacyPolicy'
import Footer from '../../commonComponents/Footer/Footer'
import { Helmet } from 'react-helmet'

class PrivacyPolicy extends Component {

    afterSign = () => {
        window.location.reload()
    }

    render() {
        return (
            <div className="privacy-policy">
                <Helmet>
                    <title>Privacy Policy</title>
                    <meta property="og:title" content="Privacy Policy"/>
                    <meta name="description"
                        content="This privacy policy explains how InviteOwl uses the personal data we collect from you when you use our website."/>
                    <meta property="og:description" content="This privacy policy explains how InviteOwl uses the personal data we collect."/>
                    <meta property="og:url" content="https://www.inviteowl.com/privacy"/>
                </Helmet>
                <NavBar
                    afterSign={this.afterSign}
                    staticColor={true}
                />
                <div className="privacy-policy-container">
                    <TextContainer
                        message={< PrivacyPolicyText />}
                    />
                </div>
                <Footer />
                {this.props.VisibilityStore.signModal ?
                    <UniversalModal
                        content={<SignModal />}
                    />
                    : null
                }
                {this.props.VisibilityStore.alert ?
                    <Alert />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(PrivacyPolicy))