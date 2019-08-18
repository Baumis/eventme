import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ComponentStyles.css'
import MasterComponent from '../MasterComponent/MasterComponent.js'
import EventDiscussion from '../EventDiscussion/EventDiscussion'

class ComponentContainer extends Component {

    render() {
        return (
            <div className="component-container">
                <div className="component-container-grid">
                    {this.props.EventStore.event.components.map(component => (
                        <MasterComponent
                            key={component.order}
                            component={component}
                            isCreator={this.props.isCreator}
                        />
                    ))}
                </div>
                <div className="component-container-discussion">
                    <EventDiscussion/>
                </div>
            </div>
        )
    }
}
export default inject('EventStore', 'VisibilityStore')(observer(ComponentContainer))