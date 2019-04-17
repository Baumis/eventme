import React, { Component } from 'react'
import './styles/App.css'
import Header from './components/Header'
import ComponentAdder from './components/ComponentAdder'
import ComponentContainer from './components/ComponentContainer'
import OptionsPanel from './components/OptionsPanel'
import eventService from './services/events'
import SaveButton from './components/SaveButton';

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

    addComponent = async () => {
        const event = await eventService.addComponent(this.state.event.id, 'Text', { text: 'New component' })
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
        console.log("save state function")
        //save state to backend
    }

    render() {
        if (this.state.loading) {
            return null
        }

        return (
            <div className='App'>
                <Header label={this.state.event.label} background={this.state.event.settings.background} save={this.saveHeader} />
                <ComponentContainer components={this.state.event.components} />
                <ComponentAdder add={this.addComponent} />
                <OptionsPanel background={this.state.event.settings.background} label={this.state.event.label} slug={this.state.event.settings.slug} changeLabel={this.changeLabel} changeBackground={this.changeBackground} changeSlug={this.changeSlug} />
                <SaveButton save={this.saveState} saved={this.state.saved}></SaveButton>
            </div>
        )
    }
}

export default App