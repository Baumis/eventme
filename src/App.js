import React, { Component } from 'react'
import './styles/App.css'
import Header from './components/Event-Header.js'
import AdderButtons from './components/ComponentAdder.js'
import ComponentRenderer from './components/ComponentContainer.js'
import componentService from './services/components.js'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userMode: "admin",
            header: {
                h1: "This is my h1 header",
                h2: "h2 header",
                color: 'blue',
                url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Hurricane_Lester_22_aug_1992_2246Z.jpg'
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

    saveHeader = (newValues) => {
        try{
            this.setState({
                header:{
                    color: newValues.color,
                    url: newValues.url
            }})
        }catch{
            alert("Error");
        }
    }

    render() {
        return (
            <div className="App">
                <Header headerData={this.state.header} save={this.saveHeader}/>
                <ComponentRenderer components={this.state.components} />
                <AdderButtons />
            </div>
        )
    }
}

export default App
