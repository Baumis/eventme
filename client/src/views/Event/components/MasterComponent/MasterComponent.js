import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Text from '../contentTypes/Text/Text'
import InviteLink from '../contentTypes/InviteLink/InviteLink'
import Picture from '../contentTypes/Picture/Picture'
import Vote from '../contentTypes/Vote/Vote'
import Form from '../contentTypes/Form/Form'
import './MasterComponent.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import EditorPanel from './EditorPanel/EditorPanel'

class MasterComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            components: {
                TEXT: Text,
                INVITE_LINK: InviteLink,
                PICTURE: Picture,
                VOTE: Vote,
                FORM: Form
            }
        }
    }

    changeComponentData = (data) => {
        this.props.EventStore.editComponentData(this.props.index, data)
    }

    render() {
        const buttonMode = this.props.editable ? 'editButtonActive' : ''
        const masterMode = this.props.editable ? 'editMasterActive' : ''
        const panelMarginTop = this.props.editable ? '0px' : '-40px'
        const TagName = this.state.components[this.props.component.type || 'TEXT']
        return (
            <div className={'master-component ' + masterMode}>
                {this.props.isCreator() ?
                    <div className="master-options-row">
                        <div className={'master-options-edit-button ' + buttonMode}
                            onClick={() => this.props.setEditable(this.props.index)}>
                            {this.props.editable ?
                                <FaChevronUp />
                                :
                                <FaChevronDown />
                            }
                        </div>
                    </div>
                    : null
                }
                <EditorPanel
                    style={panelMarginTop}
                    index={this.props.index}
                    moveEditableForward={this.props.moveEditableForward}
                    moveEditableBackward={this.props.moveEditableBackward}
                    openModal={this.props.openModal}
                />

                <TagName
                    component={this.props.component}
                    edit={this.props.editable}
                    changeData={this.changeComponentData}
                    isCreator={this.props.isCreator}
                    isGuest={this.props.isGuest}
                    openModal={this.props.openModal}
                    closeModal={this.props.closeModal}
                />
            </div>
        )
    }
}
export default inject('VisibilityStore', 'EventStore')(observer(MasterComponent))