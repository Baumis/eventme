import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Text from '../contentTypes/Text/Text'
import TextOptions from '../contentTypes/Text/TextOptions/TextOptions'
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
                TEXT: { type: Text, options: TextOptions },
                INVITE_LINK: { type: InviteLink, options: null },
                PICTURE: { type: Picture, options: null },
                VOTE: { type: Vote, options: null },
                FORM: { type: Form, options: null }
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
        const ComponentType = this.state.components[this.props.component.type || 'TEXT'].type
        const ComponentOptions = this.state.components[this.props.component.type || 'TEXT'].options
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
                    openModal={
                        () => this.props.openModal(
                            <ComponentOptions
                                component={this.props.component}
                                changeData={this.changeComponentData}
                                close={this.props.closeModal}
                            />
                        )}
                />

                <ComponentType
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