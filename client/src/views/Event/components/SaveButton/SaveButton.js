import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './SaveButton.css'
import Spinner from '../../../../commonComponents/Spinner/Spinner'
import { FaSave } from 'react-icons/fa'

class SaveButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    saveEvent = async () => {
        this.setState({ loading: true })
        const response = await this.props.EventStore.update()

        this.setState({ loading: false })
        if (!response) {
            alert('Event could not be changed.')
        }
    }

    render() {

        if (this.state.loading) {
            return (
                <div className="SaveButton">
                    <Spinner />
                </div>
            )
        }

        let bottomCSS = '-57px'
        if (!this.props.saved) {
            bottomCSS = '30px'
        }
        return (
            <div style={{ bottom: bottomCSS }} className="SaveButton" onClick={this.saveEvent}>
                <p>Save</p>
                <FaSave />
            </div>
        )
    }
}

export default inject('EventStore')(observer(SaveButton))