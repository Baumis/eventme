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
                        options: [{ content: 'option' }]
                    },
                    interactiveData: []
                },
                FORM: {
                    type: 'FORM',
                    data: {
                        questions: [{ label: 'question', answers: [] }],
                    }
                }
            }
        }
    }

    createComponent = (type) => {
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