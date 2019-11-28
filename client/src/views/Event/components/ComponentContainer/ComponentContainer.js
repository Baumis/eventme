import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ComponentContainer.css'
import MasterComponent from '../MasterComponent/MasterComponent.js'
import ComponentAdder from './ComponentAdder/ComponentAdder'

class ComponentContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: null
        }
    }

    setEditable = (index) => {
        this.setState({ editable: index })
    }

    moveEditableBackward = () => {
        if (this.state.editable > 0) {
            this.setState({ editable: this.state.editable - 1 })
        } else {
            this.setState({ editable: this.props.EventStore.event.components.length - 1 })
        }
    }

    moveEditableForward = () => {
        if (this.props.EventStore.event.components.length !== this.state.editable + 1) {
            this.setState({ editable: this.state.editable + 1 })
        } else {
            this.setState({ editable: 0 })
        }
    }

    render() {
        return (
            <div className="component-container">
                <div className="component-container-grid">
                    {this.props.EventStore.event.components.map((component, i) => (
                        <MasterComponent
                            key={i}
                            index={i}
                            editable={i === this.state.editable}
                            setEditable={this.setEditable}
                            moveEditableForward={this.moveEditableForward}
                            moveEditableBackward={this.moveEditableBackward}
                            component={component}
                            isCreator={this.props.isCreator}
                            isGuest={this.props.isGuest}
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