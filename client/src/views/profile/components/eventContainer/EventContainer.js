import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class eventContainer extends Component {

    render() {
        return (
            <div className="eventContainer">
                <div className="myEventsContainer">

                </div>
                <div className="myInvitesContainer">

                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(eventContainer))