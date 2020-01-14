import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import Navbar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import MainHeader from './components/MainHeader/MainHeader'
import Alert from '../../commonComponents/Alert/Alert'

class Main extends Component {

    render() {
        return (
            <div className="Main">
                <Navbar
                    staticColor={true}
                />
                <MainHeader />
                {this.props.VisibilityStore.signModal ?
                    <UniversalModal
                        content={<SignModal />}
                    />
                    : null}
                {this.props.VisibilityStore.alert ?
                    <Alert />
                    : null
                }
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))