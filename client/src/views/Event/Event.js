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
import User from '../../commonComponents/User/User'
import SignModal from '../../commonComponents/SignModal/SignModal'
import JoinEventModal from './components/JoinEventModal/JoinEventModal'

class Event extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            invite: false
        }
    }

    async componentDidMount() {
        if (this.props.inviteKey) {
            const inviteKey = await this.props.EventStore.validateKey(this.props.eventId, this.props.inviteKey)
            if (inviteKey) {
                this.setState({ invite: true })
            }
        }

        await this.props.EventStore.initializeEvent(this.props.eventId)
        this.props.VisibilityStore.isCreator()
        this.setState({ loading: false })
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

    render() {
        if (this.state.loading) {
            return null
        }

        return (
            <div className='Event'>
                <Header />
                <ComponentContainer />
                {this.props.VisibilityStore.creator ?
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
                <div className="UserControl">
                    <User />
                </div>
                {this.props.VisibilityStore.signModal ?
                    <SignModal history={this.props.history} />
                    : null
                }
                {this.state.invite ?
                    <JoinEventModal inviteKey={this.props.inviteKey} />
                    : null
                }
            </div>
        )
    }
}

export default inject('EventStore', 'VisibilityStore', 'UserStore')(observer(Event))