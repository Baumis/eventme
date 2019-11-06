import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EditorPanel.css'
import { FaArrowCircleLeft, FaArrowCircleRight, FaTrashAlt } from 'react-icons/fa'

class EditorPanel extends Component {

    removeComponent = () => {
        this.props.EventStore.removeComponent(this.props.index)
    }

    moveForward = () => {
        this.props.EventStore.moveComponentForward(this.props.index)
    }

    moveBackward = () => {
        this.props.EventStore.moveComponentBackward(this.props.index)
    }

    render() {
        return (
            <div className="editor-panel" style={{marginTop: this.props.style}}>
                <div className="editor-panel-arrows">
                    <div className="editor-panel-button" onClick={this.moveBackward}>
                        <FaArrowCircleLeft />
                    </div>
                    <div className="editor-panel-button" onClick={this.moveForward}>
                        <FaArrowCircleRight />
                    </div>
                </div>
                <div className="editor-panel-button" onClick={this.removeComponent}>
                    <FaTrashAlt />
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(EditorPanel))