import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ContentContainer.css'
import { FaLink, FaPuzzlePiece, FaUser } from 'react-icons/fa'

class ContentContainer extends Component {

    render() {
        return (
            <div className="content-container">
                <div className="content-container-info-row">
                    <div className="content-container-info-block">
                        <div className="content-container-title-row">
                        <FaLink />
                        <h1>Invites</h1>
                    </div>
                    <p>Use a simple link to invite people to your private events.</p>
                </div>
                <div className="content-container-info-block">
                    <div className="content-container-title-row">
                        <FaPuzzlePiece />
                        <h1>Editor</h1>
                    </div>
                    <p>Create events fast and customize them with a simple puzzlelike editor.</p>
                </div>
                <div className="content-container-info-block">
                    <div className="content-container-title-row">
                        <FaUser />
                        <h1>Manage</h1>
                    </div>
                    <p>Manage all your own events and invites in one place</p>
                </div>
            </div>
            </div >
        )
    }
}

export default inject('VisibilityStore')(observer(ContentContainer))