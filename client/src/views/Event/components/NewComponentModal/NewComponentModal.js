import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './NewComponentModal.css'
import { FaPen, FaLink, FaImage, FaPoll, FaFileAlt } from 'react-icons/fa'
import DefaultButtons from '../../../../commonComponents/UniversalModal/DefaultButtons/DefaultButtons'
import TextOptions from '../contentTypes/Text/TextOptions/TextOptions'
import InviteLinkOptions from '../contentTypes/InviteLink/InviteLinkOptions/InviteLinkOptions'
import PictureOptions from '../contentTypes/Picture/PictureOptions/PictureOptions'
import VoteOptions from '../contentTypes/Vote/VoteOptions/VoteOptions'
import FormOptions from '../contentTypes/Form/FormOptions/FormOptions'
import UniversalModal from '../../../../commonComponents/UniversalModal/UniversalModal'


class NewComponentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeData: {
                TEXT: {
                    componentData: {
                        type: 'TEXT',
                        data: { title: 'Title', content: 'content' }
                    },
                    options: TextOptions
                },
                INVITE_LINK: {
                    componentData: {
                        type: 'INVITE_LINK',
                        data: {}
                    },
                    options: InviteLinkOptions
                },
                PICTURE: {
                    componentData: {
                        type: 'PICTURE',
                        data: { url: '', expand: true }
                    },
                    options: PictureOptions
                },
                VOTE: {
                    componentData: {
                        type: 'VOTE',
                        data: {
                            subject: 'Title',
                            options: [{ label: 'option', votes: [] }]
                        }
                    },
                    options: VoteOptions
                },
                FORM: {
                    componentData: {
                        type: 'FORM',
                        data: { questions: [{ label: 'question', answers: [] }] }
                    },
                    options: FormOptions
                }
            },
            showOptions: null,
        }
    }

    createComponent = (data) => {
        const newComponent = {
            type: this.state.showOptions,
            data: data
        }
        this.props.EventStore.createComponent(newComponent)
        this.closeOptions()
        this.props.close()
    }

    closeOptions = () => {
        this.setState({ showOptions: null })
    }

    openOptions = (type) => {
        this.setState({
            showOptions: type
        })
    }

    render() {

        if (this.state.showOptions) {
            const Options = this.state.typeData[this.state.showOptions].options
            return (
                <UniversalModal
                    content={
                        <Options
                            component={this.state.typeData[this.state.showOptions].componentData}
                            createComponent={this.createComponent}
                            positiveLabel={'Create'}
                            negativeLabel={'back'}
                            positiveAction={this.createComponent}
                            negativeAction={this.closeOptions}
                        />
                    }
                />
            )
        }

        return (
            <div className="component-modal-background" >
                <div className="component-modal-container">
                    <div className="component-modal-header">
                        New component
                    </div>
                    <div className="component-modal-button-row">
                        <div className="component-modal-button" onClick={() => this.openOptions('TEXT')}>
                            <FaPen />
                            <label>Text</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.openOptions('INVITE_LINK')}>
                            <FaLink />
                            <label>Invite</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.openOptions('PICTURE')}>
                            <FaImage />
                            <label>Picture</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.openOptions('FORM')}>
                            <FaFileAlt />
                            <label>Form</label>
                        </div>
                        <div className="component-modal-button" onClick={() => this.openOptions('VOTE')}>
                            <FaPoll />
                            <label>Vote</label>
                        </div>
                    </div>
                    <DefaultButtons
                        negativeLabel={'Close'}
                        negativeAction={this.props.close}
                    />
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(NewComponentModal))