import React, { Component } from 'react'
import './Main.css'
import CreateButton from './components/createButton/CreateButton'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/loginModal/LoginModal'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayLogin: false
        }
    }

    displayLogin = () => {
        console.log('moi')
        this.state.displayLogin ?
            this.setState({ displayLogin: false })
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
                    <LoginModal close={this.displayLogin}/>
                    : null
                }
            </div>
        )
    }
}

export default Main