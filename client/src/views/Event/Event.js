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
import NewComponentModal from './components/NewComponentModal/NewComponentModal'
import NotFound from '../NotFound/NotFound'
import EventContent from './components/EventContent/EventContent'
import UniversalModal from '../../commonComponents/UniversalModal/UniversalModal'
import RegisterModal from './components/RegisterModal/RegisterModal'

class Event extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            showNewComponentModal: false,
            activeTab: 'Discussion',
            registerModal: false,
            updater: null
        }
    }

    async componentDidMount() {
        await this.props.EventStore.initializeEvent(this.props.eventId)

        this.setState({ loading: false })
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
        this.setState({
            updater: setInterval(() => {
                if (this.isGuest()) {
                    this.props.EventStore.getEvent(this.props.EventStore.event._id)
                }
            }, 20000)
        })
    }

    changeActive = (cathegory) => {
        this.setState({ activeTab: cathegory })
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
        if (!this.props.UserStore.currentUser || !this.props.EventStore.event) {
            return false
        }
        if (this.props.UserStore.currentUser._id === this.props.EventStore.event.creator._id) {
            return true
        }
        return this.props.EventStore.event.registrations.some(guest => guest.user._id === this.props.UserStore.currentUser._id)
    }

    toggleNewComponentModal = () => {
        this.setState({ showNewComponentModal: !this.state.showNewComponentModal })
    }

    slidePanel = () => {
        this.props.VisibilityStore.slideOptionsPanel()
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
                    <Navbar />
                    <Header
                        activeTab={this.state.activeTab}
                        changeActive={this.changeActive}
                        isGuest={this.isGuest}
                        togglePanel={this.slidePanel}
                        isCreator={this.isCreator}
                        toggleRegisterModal={this.toggleRegisterModal}
                    />
                    <EventContent
                        isCreator={this.isCreator}
                        activeTab={this.state.activeTab}
                        toggleNewComponentModal={this.toggleNewComponentModal}
                        active={this.state.activeTab}
                        changeActive={this.changeActive}
                        isGuest={this.isGuest}
                    />
                    {this.isCreator() ?
                        <div>
                            <OptionsPanel />
                            <SaveButton save={this.save} saved={this.props.EventStore.saved} />
                            {this.state.showNewComponentModal ?
                                <UniversalModal
                                    content={<NewComponentModal
                                        close={this.toggleNewComponentModal}
                                    />}
                                />
                                : null
                            }
                        </div>
                        : null
                    }
                    {this.props.VisibilityStore.signModal ?
                        <UniversalModal
                            content={<SignModal />}
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
                    {this.props.VisibilityStore.alert ?
                        <Alert />
                        : null
                    }
                </div>
            </React.Fragment>
        )
    }

}

export default inject('EventStore', 'VisibilityStore', 'UserStore')(observer(Event))