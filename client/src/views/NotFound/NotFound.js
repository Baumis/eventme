import React, { Component } from 'react'
import './NotFound.css'
import { inject, observer } from 'mobx-react'
import NavBar from '../../commonComponents/Navbar/Navbar'
import NotFoundMessage from './components/NotFoundMessage/NotFoundMessage'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import Alert from '../../commonComponents/Alert/Alert'

class NotFound extends Component {

    componentDidMount() {
        if (!this.props.UserStore.currentUser) {
            this.props.VisibilityStore.showSignModal(this.afterSign)
        }
    }

    afterSign = () => {
        console.log("after sign got executed")
        window.location.reload()
    }

    render() {
        return (
            <div className="NotFound">
                <NavBar
                    afterSign={this.afterSign}
                    staticColor={true}
                />
                <div className="NotFound-container">
                    <NotFoundMessage
                        title={this.props.title}
                        message={this.props.message}
                    />
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
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(NotFound))
