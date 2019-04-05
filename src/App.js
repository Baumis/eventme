import React, { Component } from 'react'
import './styles/App.css'
import Header from './components/Event-Header.js'
import AdderButtons from './components/ComponentAdder.js'
import ComponentRenderer from './components/ComponentContainer.js'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userMode: "admin",
            header: {
                h1: "This is my h1 header",
                h2: "h2 header"
            },
            components: [
                {
                    id: 1,
                    header: "headerTest1",
                    content: "This is quality content"
                },
                {
                    id: 2,
                    header: "headerTest2",
                    content: "This is quality content"
                },
                {
                    id: 3,
                    header: "headerTest3",
                    content: "This is quality content"
                }
            ]
        }
    }

    add

    render() {
        return (
            <div className="App">
                <Header h1={this.state.header.h1} h2={this.state.header.h2} />
                <ComponentRenderer components={this.state.components} />
                <AdderButtons />
            </div>
        )
    }
}

export default App
