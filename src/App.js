import React, { Component } from 'react'
import './styles/App.css'
import Header from './components/Event-Header.js'
import AdderButtons from './components/ComponentAdder.js'
import ComponentRenderer from './components/ComponentContainer.js'
import componentService from './services/components.js'
import OptionsPanel from './components/OptionsPanel';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userMode: "admin",
            header: {
                h1: "This is my h1 header",
                h2: "h2 header",
                color: 'White',
                url: 'https://upload.wikimedia.org/wikipedia/commons/3/31/The_Spitzer_Space_Telescope%27s_view_of_W40.jpg'
            },
            components: []
        }
    }

    async componentDidMount() {
        const components = await componentService.getAll()
        this.setState({
            components
        })
        console.log(this.state)
    }

    render() {
        return (
            <div className="App">
                <Header headerData={this.state.header} />
                <ComponentRenderer components={this.state.components} />
                <OptionsPanel headerData={this.state.header} />
                <AdderButtons />
            </div>
        )
    }
}

export default App
