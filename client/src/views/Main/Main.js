import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Main.css'
import Navbar from '../../commonComponents/Navbar/Navbar'
import Footer from '../../commonComponents/Footer/Footer'
import SignModal from '../../commonComponents/SignModal/SignModal'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import MainHeader from './components/MainHeader/MainHeader'
import Alert from '../../commonComponents/Alert/Alert'
import ContentContainer from './components/ContentContainer/ContentContainer'
import { Helmet } from 'react-helmet'
import EventFeed from '../../commonComponents/EventFeed/EventFeed'
import FeaturedFeed from './components/FeaturedFeed/FeaturedFeed'

class Main extends Component {

    render() {
        return (
            <div className="Main">
                <Helmet>
                    <title>InviteOwl Events - Create, host and attend events</title>
                    <meta property="og:title" content="InviteOwl Events - Create, host and attend events"/>
                    <meta name="description"
                        content="Create an event in 5 seconds with InviteOwl using local, Google or Facebook account. Invite guests by sharing a link. Manage all events in one place."/>
                    <meta property="og:description" content="Create an event in 5 seconds with InviteOwl using local, Google or Facebook account. Invite guests by sharing a link. Manage all events in one place."/>
                    <meta property="og:url" content="https://www.inviteowl.com/"/>
                </Helmet>
                <Navbar
                    staticColor={true}
                />
                <MainHeader />
                <FeaturedFeed />
                <ContentContainer />
                {this.props.VisibilityStore.signModal ?
                    <UniversalModal
                        content={<SignModal />}
                    />
                    : null}
                {this.props.VisibilityStore.alert ?
                    <Alert />
                    : null
                }
                <div className="main-filler">

                </div >
                <Footer style={{ background: 'white', border: 'none' }} />
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Main))