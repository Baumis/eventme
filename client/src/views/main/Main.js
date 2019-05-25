import React, { Component } from 'react'
import './Main.css'
import CreateButton from './components/createButton/CreateButton'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayLogin: false
        }
    }

    displayLogin = () => {
        this.state.displayLogin ?
            this.setState({ displaylogin: false })
            : this.setState({ displayLogin: true })
    }

    render() {
        return (
            <div className="Main">
                <Navbar />
                <div className="MainContent">
                    <CreateButton click={this.displayLogin}/>
                </div>
                {this.state.displayLogin ?
                    <Login />
                    : null
                }
            </div>
        )
    }
}

export default Main