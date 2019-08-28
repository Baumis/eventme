import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './EditorPanel.css'
import { FaArrowCircleLeft, FaArrowCircleRight, FaTrashAlt } from 'react-icons/fa'

class EditorPanel extends Component {

    removeComponent = () => {
        const confirmation = window.confirm('Delete component?')
        if (confirmation) {
            this.props.EventStore.removeComponent(this.props.order)
        }
    }

    render() {
        return (
            <div className="editor-panel" style={{marginTop: this.props.style}}>
                <div className="editor-panel-arrows">
                    <div className="editor-panel-button">
                        <FaArrowCircleLeft />
                    </div>
                    <div className="editor-panel-button">
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