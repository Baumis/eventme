import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './NewComponentModal.css'
import { FaPen, FaLink, FaImage, FaPoll, FaFileAlt } from 'react-icons/fa'


class NewComponentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeData: {
                TEXT: {
                    type: 'TEXT',
                    data: { title: 'Title', content: 'content' }
                },
                INVITE_LINK: {
                    type: 'INVITE_LINK',
                    data: {}
                },
                PICTURE: {
                    type: 'PICTURE',
                    data: { url: '', expand: false }
                },
                VOTE: {
                    type: 'VOTE',
                    data: {
                        subject: 'Title',
                        options: [{ _id: this.generateUUIDv4(), content: 'option' }]
                    },
                    interactiveData: []
                },
                FORM: {
                    type: 'FORM',
                    data: {
                        questions: [{ _id: this.generateUUIDv4(), content: 'title' }]
                    },
                    interactiveData: []
                }
            }
        }
    }

    generateUUIDv4 = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    createComponent = (type) => {
        console.log(this.state.typeData[type])
        this.props.EventStore.createComponent(this.state.typeData[type])
        this.props.close()
    }

    render() {
        return (
            <div className="component-modal-background" >
                <div className="component-modal-container">
                    <div className="component-modal-button-row">
                        <div className="component-modal-button" onClick={() => this.createComponent('TEXT')}>
                            <FaPen />
                            <label>Text</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.createComponent('INVITE_LINK')}>
                            <FaLink />
                            <label>Invite</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.createComponent('PICTURE')}>
                            <FaImage />
                            <label>Picture</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.createComponent('FORM')}>
                            <FaFileAlt />
                            <label>Form</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.createComponent('VOTE')}>
                            <FaPoll />
                            <label>Vote</label>
                        </div>
                    </div>
                    <div className="component-modal-bottom-row">
                        <div className="component-modal-close" onClick={this.props.close} >
                            close
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(NewComponentModal))