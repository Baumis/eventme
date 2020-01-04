import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import Navbar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import ContentBook from './components/ContentBook/ContentBook'

class Main extends Component {

    render() {
        return (
            <div className="Main">
                <Navbar />
                <ContentBook />

                {this.props.VisibilityStore.signModal ?
                    <UniversalModal
                        content={<SignModal />}
                    />
                    : null}
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))