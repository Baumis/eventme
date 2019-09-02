import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './NewComponentModal.css'
import { FaPen, FaTimes, FaComments, FaLink, FaUsers, FaImage } from 'react-icons/fa'


class NewComponentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeData: {
                TEXT: { title: 'Your title', content: 'excellent content' },
                GUESTS: {},
                INVITE_LINK: {},
                DISCUSSION: {},
                PICTURE: { url: '' }
            }
        }
    }

    createComponent = (type) => {
        this.props.EventStore.createComponent(type, this.state.typeData[type])
        this.props.close()
    }

    render() {
        return (
            <div className="component-modal-background" >
                <div className="component-modal-container">
                    <div className="component-modal-top-row">
                        <div className="component-modal-exit-icon" onClick={this.props.close} ><FaTimes /></div>
                    </div>
                    <div className="component-modal-button-row">
                        <div className="component-modal-button" onClick={() => this.createComponent('TEXT')}>
                            <FaPen />
                            <label>Text</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.createComponent('GUESTS')}>
                            <FaUsers />
                            <label>Guests</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.createComponent('INVITE_LINK')}>
                            <FaLink />
                            <label>Invite</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.createComponent('DISCUSSION')}>
                            <FaComments />
                            <label>Discussion</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.createComponent('PICTURE')}>
                            <FaImage />
                            <label>Picture</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(NewComponentModal))