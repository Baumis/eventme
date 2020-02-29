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

class PrivacyPolicy extends Component {

    afterSign = () => {
        window.location.reload()
    }

    render() {
        return (
            <div className="privacy-policy">
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