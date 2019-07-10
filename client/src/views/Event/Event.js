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
import LoginModal from '../../commonComponents/SignModal/SignModal'

class Event extends Component {

    async componentDidMount() {
        await this.props.EventStore.initializeEvent(this.props.eventId)
        await this.props.VisibilityStore.loadingOff()
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
        if (this.props.EventStore.event._id) {
            const event = await this.props.EventStore.update()
            console.log(event)
        } else {
            const event = await this.props.EventStore.create()
            if (event) {
                this.props.history.push(`/events/${event._id}`)
            }
        }
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
        if (this.props.VisibilityStore.loading) {
            return null
        }

        return (
            <div className='Event'>
                <Header />
                <ComponentContainer />
                <ComponentAdder add={this.addComponent} />
                <OptionsPanel />
                <OptionsButton showPanel={this.slidePanel} />
                <div className="UserControl">
                    <User history={this.props.history} />
                </div>
                {this.props.VisibilityStore.componentEditor ?
                    <ComponentEditor
                        close={this.closeEditor}
                        component={this.props.EventStore.getComponent(this.props.VisibilityStore.currentComponent)}
                    />
                    : null
                }
                {this.props.VisibilityStore.loginModal ?
                    <LoginModal history={this.props.history} />
                    : null
                }
                <SaveButton save={this.save} saved={this.props.EventStore.saved} />
            </div>
        )
    }
}

export default inject('EventStore', 'VisibilityStore')(observer(Event))