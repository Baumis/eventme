import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import Navbar from '../../commonComponents/Navbar/Navbar'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import ContentContainer from './components/ContentContainer/ContentContainer'
import MainHeader from './components/MainHeader/MainHeader'
import CreateEventForm from './components/CreateEventForm/CreateEventForm'

class Main extends Component {

    render() {
        return (
            <div className="Main">
                <Navbar />
                <MainHeader />
                <CreateEventForm />
                <ContentContainer />

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