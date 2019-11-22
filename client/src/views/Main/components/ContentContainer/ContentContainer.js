import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ContentContainer.css'
import { FaLink, FaPuzzlePiece } from 'react-icons/fa'

class ContentContainer extends Component {

    render() {
        return (
            <div className="content-container">
                <div className="content-container-info-row">
                    <div className="content-container-info-block">
                        <div className="content-container-title-row">
                        <h1>Link</h1>
                        <FaLink />
                    </div>
                    <p>Use a simple and specified link to invite people to the event.</p>
                </div>
                <div className="content-container-info-block">
                    <div className="content-container-title-row">
                        <h1>Editor</h1>
                        <FaPuzzlePiece />
                    </div>
                    <p>Create events fast and customize them with a simple puzzlelike editor.</p>
                </div>
            </div>
            </div >
        )
    }
}

export default inject('VisibilityStore')(observer(ContentContainer))