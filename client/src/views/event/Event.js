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
import User from './components/User/User'

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

    save = () => {
        this.props.EventStore.save()
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
                <User />
                <ComponentContainer />
                <ComponentAdder add={this.addComponent} />
                <OptionsPanel />
                <OptionsButton showPanel={this.slidePanel} />

                {this.props.VisibilityStore.componentEditor
                    ? (<ComponentEditor
                        close={this.closeEditor}
                        component={this.props.EventStore.getComponent(this.props.VisibilityStore.currentComponent)}
                    />)
                    : (null)
                }

                <SaveButton save={this.save} saved={this.props.EventStore.saved} />
            </div>
        )
    }
}

export default inject('EventStore', 'VisibilityStore')(observer(Event))