import React, { Component } from 'react'
import './styles/App.css'
import Header from './components/Header'
import ComponentAdder from './components/ComponentAdder'
import ComponentContainer from './components/ComponentContainer'
import eventService from './services/events'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
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
        await eventService.addComponent(this.state.event.id, 'Text', {text: 'New component'})
    }

    render() {
        if (this.state.loading) {
            return null
        }

        return (
            <div className='App'>
                <Header label={this.state.event.label} background={this.state.event.settings.background} save={this.saveHeader} />
                <ComponentContainer components={this.state.event.components} />
                <ComponentAdder add={this.addComponent}/>
            </div>
        )
    }
}

export default App
