import React, { Component } from 'react'
import './MasterComponent.css'
import { FaAngleDown } from 'react-icons/fa'

class OptionsDropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: 'none',
        }
    }

    displayMenu = () => {
        let displayCSS = 'block'
        document.addEventListener('click', this.displayMenu)

        if (this.state.display === 'block') {
            displayCSS = 'none'
            document.removeEventListener('click', this.displayMenu)
        }
        this.setState({ display: displayCSS })
    }

    delete = () => {
        this.props.delete(this.props.order)
    }

    render() {
        return (
            <div className="Options">
                <div className="OptionsButton" onClick={this.displayMenu}>
                    <FaAngleDown />
                </div>
                <div style={{ display: this.state.display }} className="OptionsDropDown">
                    <div className="MenuItem" >Edit</div>
                    <div className="MenuItem" onClick={this.delete}>Delete</div>
                </div>
            </div>
        )
    }
}

export default OptionsDropDown