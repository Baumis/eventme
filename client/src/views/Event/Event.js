import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Prompt } from 'react-router'
import './Event.css'
import Header from './components/Header/Header'
import OptionsPanel from './components/OptionsPanel/OptionsPanel'
import SaveButton from './components/SaveButton/SaveButton'
import Alert from '../../commonComponents/Alert/Alert'
import SignModal from '../../commonComponents/SignModal/SignModal'
import Navbar from '../../commonComponents/Navbar/Navbar'
import Footer from '../../commonComponents/Footer/Footer'
import NotFound from '../NotFound/NotFound'
import EventContent from './components/EventContent/EventContent'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import RegisterModal from './components/RegisterModal/RegisterModal'
import InviteLink from './components/InviteLink/InviteLink'
import GuestModal from './components/GuestContainer/GuestModal/GuestModal'
import AnswerModal from './components/GuestContainer/RegisterResults/AnswerModal/AnswerModal'

class Event extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            activeTab: 'Discussion',
            registerModal: false,
            inviteLink: false,
            guestModal: false,
            answerModal: null,
            updater: null
        }
    }

    async componentDidMount() {
        await this.props.EventStore.initializeEvent(this.props.eventUrl)
        this.setState({
            loading: false,
            inviteLink: this.props.EventStore.event ? this.props.EventStore.event.registrations.length < 2 : false
        })
        this.startEventUpdater()
    }

    componentDidUpdate = () => {
        if (!this.props.EventStore.saved) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = undefined
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.updater)
        window.onbeforeunload = null
    }

    startEventUpdater = () => {
        if (this.props.EventStore.event) {
            this.setState({
                updater: setInterval(() => {
                    this.props.EventStore.getEvent(this.props.EventStore.event.url)
                }, 20000)
            })
        }
    }

    changeActive = (cathegory) => {
        this.setState({ activeTab: cathegory })
    }

    toggleAnswerModal = (value) => {
        this.setState({ answerModal: value })
    }

    toggleGuestModal = () => {
        this.setState({ guestModal: !this.state.guestModal })
    }

    toggleRegisterModal = () => {
        this.setState({ registerModal: !this.state.registerModal })
    }

    isCreator = () => {
        if (!this.props.UserStore.currentUser) {
            return false
        }
        return this.props.UserStore.currentUser._id === this.props.EventStore.event.creator._id
    }

    isGuest = () => {
        if (!this.props.EventStore.event) {
            return false
        }
        if (!this.props.UserStore.currentUser) {
            const existing = localStorage.getItem('joinedEvents')
            const joinedEvents = existing ? JSON.parse(existing) : []
            return joinedEvents.includes(this.props.EventStore.event._id)
        }
        if (this.props.UserStore.currentUser._id === this.props.EventStore.event.creator._id) {
            return true
        }
        return this.props.EventStore.event.registrations.some(guest => guest.user._id === this.props.UserStore.currentUser._id)
    }

    toggleInviteLink = () => {
        this.setState({ inviteLink: !this.state.inviteLink })
    }

    slidePanel = () => {
        this.props.VisibilityStore.slideOptionsPanel()
    }

    afterSign = async () => {
        await this.props.EventStore.getEvent(this.props.EventStore.event.url)
    }

    render() {
        if (this.state.loading) {
            return null
        }
        if (!this.props.EventStore.event) {
            return (
                <NotFound
                    title={'Event not found'}
                    message={'The event you are looking for is removed or you don\'t have permission to view it.'}
                />
            )
        }
        return (
            <React.Fragment>
                <Prompt
                    when={!this.props.EventStore.saved}
                    message='You have unsaved changes, are you sure you want to leave?'
                />
                <div className='Event'>
                    <Navbar
                        staticColor={true}
                        afterSign={this.afterSign}
                    />
                    <Header
                        activeTab={this.state.activeTab}
                        changeActive={this.changeActive}
                        isGuest={this.isGuest}
                        togglePanel={this.slidePanel}
                        isCreator={this.isCreator}
                        toggleRegisterModal={this.toggleRegisterModal}
                        toggleInviteLink={this.toggleInviteLink}
                    />
                    <EventContent
                        isCreator={this.isCreator}
                        activeTab={this.state.activeTab}
                        active={this.state.activeTab}
                        changeActive={this.changeActive}
                        isGuest={this.isGuest}
                        toggleGuestModal={this.toggleGuestModal}
                        toggleAnswerModal={this.toggleAnswerModal}
                    />
                    <Footer />
                    {this.isCreator() ?
                        <div>
                            <OptionsPanel />
                            <SaveButton save={this.save} saved={this.props.EventStore.saved} />
                        </div>
                        : null
                    }
                    {this.props.VisibilityStore.alert ?
                        <Alert />
                        : null
                    }
                    {this.state.inviteLink && this.isCreator() ?
                        <UniversalModal
                            content={<InviteLink
                                toggleInviteLink={this.toggleInviteLink}
                            />}
                        />
                        : null
                    }
                    {this.state.registerModal ?
                        <UniversalModal
                            content={<RegisterModal
                                toggleRegisterModal={this.toggleRegisterModal}
                                isGuest={this.isGuest}
                                changeActive={this.changeActive}
                            />}
                        />
                        : null
                    }
                    {this.state.guestModal ?
                        <UniversalModal
                            content={<GuestModal
                                toggleGuestModal={this.toggleGuestModal}
                            />}
                        />
                        : null
                    }
                    {this.state.answerModal ?
                        <UniversalModal
                            content={<AnswerModal
                                question={this.state.answerModal}
                                toggleAnswerModal={this.toggleAnswerModal}
                            />}
                        />
                        : null
                    }
                    {this.props.VisibilityStore.signModal ?
                        <UniversalModal
                            content={<SignModal />}
                        />
                        : null
                    }
                </div>
            </React.Fragment>
        )
    }

}

export default inject('EventStore', 'VisibilityStore', 'UserStore')(observer(Event))