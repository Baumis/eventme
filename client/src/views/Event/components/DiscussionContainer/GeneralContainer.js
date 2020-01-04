import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './GeneralContainer.css'
import Discussion from './Discussion/EventDiscussion'
import About from './About/About'

class GeneralContainer extends Component {

    render() {
        return (
            <div className="general-content">
                <div>
                    <div className="general-content-columns">
                        {this.props.EventStore.event.description.length > 0 ?
                            <div>
                                <div className="general-title">
                                    About
                                </div>
                                <About
                                    description={this.props.EventStore.event.description}
                                />
                            </div>
                            : null}
                    </div>
                    <div className="general-title">
                        Discussion
                    </div>
                    <Discussion isCreator={this.props.isCreator} />
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(GeneralContainer))