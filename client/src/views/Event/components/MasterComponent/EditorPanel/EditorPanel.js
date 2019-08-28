import React, { Component } from 'react'
import './EditorPanel.css'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

class EditorPanel extends Component {

    render() {
        return (
            <div className="editor-panel">
                <div className="editor-panel-arrows">
                    <div className="editor-panel-button">
                        <FaArrowCircleLeft />
                    </div>
                    <div className="editor-panel-button">
                        <FaArrowCircleRight />
                    </div>
                </div>
            </div>
        )
    }
}

export default EditorPanel