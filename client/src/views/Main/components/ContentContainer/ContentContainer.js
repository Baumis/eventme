import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ContentContainer.css'
import CreateButton from '../CreateButton/CreateButton'

class ContentContainer extends Component {

    render() {
        if (this.props.VisibilityStore.signModal) {
            return <div className="content-container"></div>
        }

        return (
            <div className="content-container">
                <div className="content-container-info-row">
                        <div className="content-container-info-block">
                            <h1>Let's create your event!</h1>
                            <p>Get things started by clicking the button below!</p>
                            <CreateButton click={this.props.click} />
                        </div>
                        <div className="content-container-info-block">
                            <h1>What is InviteOwl?</h1>
                            <p>InviteOwl is a great tool for creating homes for your events. Share your events and invite your friends!</p>
                        </div>
                </div>
            </div>
        )
    }
}

export default inject('VisibilityStore')(observer(ContentContainer))