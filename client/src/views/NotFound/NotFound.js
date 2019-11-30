import React, { Component } from 'react'
import './NotFound.css'
import { inject, observer } from 'mobx-react'
import NavBar from '../../commonComponents/Navbar/Navbar'
import NotFoundMessage from './components/NotFoundMessage/NotFoundMessage'
import SignModal from '../../commonComponents/SignModal/SignModal'

class NotFound extends Component {

    componentDidMount() {
        if(!this.props.UserStore.currentUser){
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
                <NavBar afterSign={this.afterSign} />
                <div className="NotFound-container">
                    <NotFoundMessage
                        title={this.props.title}
                        message={this.props.message}
                    />
                </div>
                {this.props.VisibilityStore.signModal ?
                    <SignModal />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(NotFound))
