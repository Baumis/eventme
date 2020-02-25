import React, { Component } from 'react'
import './PrivacyPolicy.css'
import { inject, observer } from 'mobx-react'
import NavBar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import Alert from '../../commonComponents/Alert/Alert'
import TextContainer from './components/TextContainer/TextContainer'
import PrivacyPolicyText from './components/TextContainer/InviteOwlprivacypolicy.txt'

class PrivacyPolicy extends Component {

    afterSign = () => {
        window.location.reload()
    }

    render() {
        return (
            <div className="privacy-policy">
                <NavBar afterSign={this.afterSign} />
                <div className="privacy-policy-container">
                    <TextContainer 
                        title={'Privacy Policy'}
                        message={PrivacyPolicyText}
                    />
                </div>
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