import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './MasterComponent.css'
import { FaAngleDown } from 'react-icons/fa'

class OptionsDropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false
        }
    }

    displayMenu = (event) => {
        event.preventDefault()

        this.setState({ display: true }, () => {
            document.addEventListener('click', this.hideMenu)
        })
    }

    hideMenu = () => {
        this.setState({ display: false }, () => {
            document.removeEventListener('click', this.hideMenu)
        })
    }

    remove = () => {
        this.props.EventStore.removeComponent(this.props.order)
    }

    edit = () => {
        this.props.VisibilityStore.showComponentEditor(this.props.order)
        console.log('editor opened in DD, order: ', this.props.order)
    }

    render() {
        return (
            <div className="Options">
                <div className="OptionsButton" onClick={this.displayMenu}>
                    <FaAngleDown />
                </div>
                {this.state.display
                    ? (
                        <div className="OptionsDropDown">
                            <div className="MenuItem" onClick={this.edit}>Edit</div>
                            <div className="MenuItem" onClick={this.remove}>Delete</div>
                        </div>
                    )
                    : (null)
                }
            </div>
        )
    }
}
export default inject('EventStore', 'VisibilityStore')(observer(OptionsDropDown))