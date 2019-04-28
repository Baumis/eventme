import React, { Component } from 'react'
import './App.css'
import Header from './components/Header/Header'
import ComponentAdder from './components/ComponentContainer/ComponentAdder'
import ComponentContainer from './components/ComponentContainer/ComponentContainer'
import OptionsPanel from './components/OptionsPanel/OptionsPanel'
import eventService from './services/events'
import SaveButton from './components/SaveButton/SaveButton'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            saved: true,
            event: null
        }
    }

    async componentDidMount() {
        const event = await eventService.getOne(0)
        await this.setState({
            loading: false,
            event
        })
        console.log(this.state)
    }

    addComponent = async (type, data) => {
        const event = await eventService.addComponent(this.state.event.id, type, data)
        console.log(event)
        this.setState({ event })
    }

    addGuest = async (name) => {
        const event = await eventService.addGuest(this.state.event.id, name)
        this.setState({ event })
    }

    changeBackground = (event) => {
        const oldEvent = this.state.event
        oldEvent.settings.background = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeLabel = (event) => {
        const oldEvent = this.state.event
        oldEvent.label = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeSlug = (event) => {
        const oldEvent = this.state.event
        oldEvent.settings.slug = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    saveState = () => {
        this.setState({ saved: true })
        console.log('save state function')
        //save state to backend
    }

    changePhone = (event) => {
        const oldEvent = this.state.event
        oldEvent.infoPanel.phone = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeContact = (event) => {
        const oldEvent = this.state.event
        oldEvent.infoPanel.contact = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeDate = (event) => {
        const oldEvent = this.state.event
        oldEvent.infoPanel.date = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    changeAddress = (event) => {
        const oldEvent = this.state.event
        oldEvent.infoPanel.address = event.target.value
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    deleteComponent = (order) => {
        const oldEvent = this.state.event
        oldEvent.components = oldEvent.components.filter(component => component.order !== order)
        this.setState({ event: oldEvent })
        this.setState({ saved: false })
    }

    render() {
        if (this.state.loading) {
            return null
        }

        return (
            <div className='App'>
                <Header
                    label={this.state.event.label}
                    background={this.state.event.settings.background}
                    save={this.saveHeader}
                    phone={this.state.event.infoPanel.phone}
                    address={this.state.event.infoPanel.address}
                    date={this.state.event.infoPanel.date}
                    contact={this.state.event.infoPanel.contact}
                />
                <ComponentContainer
                    components={this.state.event.components}
                    deleteComponent={this.deleteComponent}
                />
                <ComponentAdder add={this.addComponent} />
                <OptionsPanel
                    background={this.state.event.settings.background}
                    label={this.state.event.label}
                    infoPanel={this.state.event.infoPanel}
                    slug={this.state.event.settings.slug}
                    changeLabel={this.changeLabel}
                    changeBackground={this.changeBackground}
                    changeSlug={this.changeSlug}
                    changePhone={this.changePhone}
                    changeContact={this.changeContact}
                    changeDate={this.changeDate}
                    changeAddress={this.changeAddress}
                />
                <SaveButton save={this.saveState} saved={this.state.saved}></SaveButton>
            </div>
        )
    }
}

export default App