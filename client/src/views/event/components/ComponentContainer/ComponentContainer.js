import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ComponentStyles.css'
import MasterComponent from '../MasterComponent/MasterComponent.js'

class ComponentContainer extends Component {

    render() {
        return (
            <div className="componentContainer">
                {this.props.EventStore.event.components.map(component => (
                    <MasterComponent
                        key={component.order}
                        component={component}
                        //guests={props.guests}
                    />
                ))}
            </div>
        )
    }
}
export default inject('EventStore', 'VisibilityStore')(observer(ComponentContainer))