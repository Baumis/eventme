import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SaveButton.css'
import Spinner from '../../../../commonComponents/Spinner/Spinner'
import { FaSave, FaTrashAlt } from 'react-icons/fa'

class SaveButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            saveing: false,
            discarding: false
        }
    }

    discardChanges = async () => {
        this.setState({ discarding: true })
        const response = await this.props.EventStore.initializeEvent(this.props.EventStore.event.url)
        this.setState({ discarding: false })

        if (!response) {
            alert('Changes could not be discarded.')
        }
    }

    saveEvent = async () => {
        this.setState({ saveing: true })
        const response = await this.props.EventStore.update()

        this.setState({ saveing: false })
        if (!response) {
            alert('Event could not be changed.')
        }
    }

    render() {
        let bottomCSS = '-157px'
        if (!this.props.saved) {
            bottomCSS = '10px'
        }
        return (
            <div className="save-button-panel" style={{ bottom: bottomCSS }}>
                <div className="discard-button" onClick={this.discardChanges}>
                    {this.state.discarding ?
                        <Spinner />
                        :
                        <div className="save-button-label">
                            <p>Discard</p>
                            <FaTrashAlt />
                        </div>
                    }
                </div>
                <div style={{ bottom: bottomCSS }} className="save-button" onClick={this.saveEvent}>
                    {this.state.saveing ?
                        <Spinner />
                        :
                        <div className="save-button-label">
                            <p>Save</p>
                            <FaSave />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(SaveButton))