import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ComponentContainer.css'
import MasterComponent from '../MasterComponent/MasterComponent.js'
import ComponentAdder from './ComponentAdder/ComponentAdder'

class ComponentContainer extends Component {

    render() {
        return (
            <div className="component-container">
                <div className="component-container-grid">
                    {this.props.EventStore.event.components.map((component, i) => (
                        <MasterComponent
                            key={i}
                            index={i}
                            component={component}
                            isCreator={this.props.isCreator}
                        />
                    ))}
                </div>
                {this.props.isCreator() ?
                    <ComponentAdder add={this.props.toggleNewComponentModal} />
                    : null}
            </div>
        )
    }
}
export default inject('EventStore', 'VisibilityStore')(observer(ComponentContainer))