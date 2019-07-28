import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Event.css'
import Header from './components/Header/Header'
import ComponentAdder from './components/ComponentContainer/ComponentAdder'
import ComponentContainer from './components/ComponentContainer/ComponentContainer'
import OptionsPanel from './components/OptionsPanel/OptionsPanel'
import SaveButton from './components/SaveButton/SaveButton'
import ComponentEditor from './components/ComponentEditor/ComponentEditor'
import OptionsButton from './components/OptionsButton/OptionsButton'
import SignModal from '../../commonComponents/SignModal/SignModal'
import JoinEventModal from './components/JoinEventModal/JoinEventModal'
import Navbar from '../../commonComponents/Navbar/Navbar'

class Event extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            showInviteModal: false
        }
    }

    async componentDidMount() {
        if (this.props.inviteKey) {
            await this.props.EventStore.validateKey(this.props.eventId, this.props.inviteKey)
            this.setState({ showInviteModal: true })
        } else {
            await this.props.EventStore.initializeEvent(this.props.eventId)
        }

        this.setState({ loading: false })
    }

    isCreator = () => {
        if (!this.props.UserStore.currentUser) {
            return false
        }
        return this.props.UserStore.currentUser._id === this.props.EventStore.event.creator._id
    }

    addComponent = () => {
        this.props.EventStore.addComponent('TEXT', 'New')
        this.props.VisibilityStore.showComponentEditor(this.props.EventStore.event.components.length)
        console.log(this.props.EventStore.event.components)
    }

    addGuest = async (name) => {
        console.log('TODO: add guest: ' + name)
    }

    save = async () => {
        const event = await this.props.EventStore.update()
        console.log(event)
    }

    showEditor = () => {
        this.props.VisibilityStore.showComponentEditor()
    }

    closeEditor = () => {
        this.props.VisibilityStore.closeComponentEditor()
    }

    slidePanel = () => {
        this.props.VisibilityStore.slideOptionsPanel()
    }

    closeInviteModal = () => {
        this.setState({ showInviteModal: false })
    }

    render() {
        if (this.state.loading || !this.props.EventStore.event) {
            return null
        }

        return (
            <div className='Event'>
                <Navbar />
                <Header />
                <ComponentContainer isCreator={this.isCreator}/>
                {this.isCreator() ?
                    <div>
                        <ComponentAdder add={this.addComponent} />
                        <OptionsPanel />
                        <OptionsButton showPanel={this.slidePanel} />
                        <SaveButton save={this.save} saved={this.props.EventStore.saved} />
                        {this.props.VisibilityStore.componentEditor ?
                            <ComponentEditor
                                close={this.closeEditor}
                                component={this.props.EventStore.getComponent(this.props.VisibilityStore.currentComponent)}
                            />
                            : null
                        }
                    </div>
                    : null
                }
                {this.props.VisibilityStore.signModal ?
                    <SignModal history={this.props.history} />
                    : null
                }
                {this.state.showInviteModal ?
                    <JoinEventModal inviteKey={this.props.inviteKey} closeInviteModal={this.closeInviteModal} />
                    : null
                }
            </div>
        )
    }
}

export default inject('EventStore', 'VisibilityStore', 'UserStore')(observer(Event))