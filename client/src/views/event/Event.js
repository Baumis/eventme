import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Event.css'
import Header from './components/Header/Header'
import ComponentAdder from './components/ComponentContainer/ComponentAdder'
import ComponentContainer from './components/ComponentContainer/ComponentContainer'
import OptionsPanel from './components/OptionsPanel/OptionsPanel'
import eventService from '../../services/events'
import SaveButton from './components/SaveButton/SaveButton'
import ComponentEditor from './components/ComponentEditor/ComponentEditor'
import OptionsButton from './components/OptionsButton/OptionsButton'
import User from './components/User/User'

class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            saved: true,
            optionsPanel: '0px',
            editor: {
                show: false,
                order: null
            },
            event: null
        }
    }

    async componentDidMount() {
        //const event = await eventService.getOne('5d07dcafa37e6c0904b17423')
        const event = { "_id": "5d07dcafa37e6c0904b17423", "label": "This is me", "creator": { "_id": "5cd445507c2a502a18cba5ca", "name": "John Doe" }, "settings": { "background": "https://picsum.photos/1440/550" }, "infoPanel": { "phone": "", "email": "", "contact": "", "address": "", "date": "2019-06-17T18:22:49.820Z" }, "guests": [], "components": [{"order": 1, "type": "Text", "data": {"title": "Moi", "content": "Moi taas"}}] }
        await this.props.EventStore.initializeEvent()
        await this.setState({
            loading: false,
            event
        })
    }

    addComponent = () => {
        this.props.EventStore.addComponent('Text', 'New')
        this.props.VisibilityStore.showComponentEditor(this.props.EventStore.event.components.length)
        console.log(this.props.EventStore.event.components)
    }

    addGuest = async (name) => {
        console.log('TODO: add guest: ' + name)
    }

    save = () => {
        this.props.EventStore.save()
    }

    showEditor = (order) => {
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
                <User />
                <ComponentContainer
                    components={this.state.event.components}
                    guests={this.state.event.guests}
                    deleteComponent={this.deleteComponent}
                    showEditor={this.showEditor}
                />
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