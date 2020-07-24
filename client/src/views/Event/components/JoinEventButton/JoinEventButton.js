import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './JoinEventButton.css'
import Spinner from '../../../../commonComponents/Spinner/Spinner'

class JoinEventModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    join = async () => {
        this.props.toggleRegisterModal()
    }

    render() {
        return (
            <div className="join-event-button-container">
                <div className="join-event-button" onClick={() => this.join()}>
                    {this.state.loading ? <Spinner /> : 'Attend event'}
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore', 'EventStore')(observer(JoinEventModal))