import React, { Component } from 'react'
import './UnsignedUser.css'
import SignInput from '../../../../../commonComponents/SignModal/components/SignInput/SignInput'
import { FaMask, FaExclamationTriangle, FaUser } from 'react-icons/fa'

class AliasSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showAlias: false
        }
    }

    toggleAlias = () => {
        this.setState({ showAlias: !this.state.showAlias })
    }

    render() {
        return (
            <div>
                <div className="unsigned-user-title">
                    Or leave your name on the list.
                </div>
                {!this.state.showAlias ?
                    <div className="facebook-login-wrapper">
                        <div className="unsigned-user-alias-button" onClick={this.toggleAlias}>
                            <div className="unsigned-user-alias-icon">
                                <FaMask />
                            </div>
                            Alias
                        </div>
                    </div>
                    :
                    <div>
                        <div className="unsigned-user-info">
                            <span>
                                <FaExclamationTriangle />
                            </span>
                            You can not post messages or get notified about new messages when using an alias. This name will just appear in the guestlist.
                        </div>
                        <SignInput
                            label={''}
                            secondLabel={''}
                            change={this.props.changeAlias}
                            value={this.props.alias}
                            placeholder={'Full name'}
                            type={'text'}
                            icon={<FaUser />}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default AliasSection