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
                            <h1>Invite</h1>
                        </div>
                        <p>Easily share your events using the web address of the event page.</p>
                    </div>
                    <div className="content-container-info-block">
                        <div className="content-container-title-row">
                            <FaPuzzlePiece />
                            <h1>Edit</h1>
                        </div>
                        <p>Create events fast and customize them with our simple editor.</p>
                    </div>
                    <div className="content-container-info-block">
                        <div className="content-container-title-row">
                            <FaUser />
                            <h1>Easy to join</h1>
                        </div>
                        <p>Guests can join using their favorite social media account or just by leaving their name on the guestlist.</p>
                    </div>
                </div>
            </div >
        )
    }
}

export default inject('VisibilityStore')(observer(ContentContainer))