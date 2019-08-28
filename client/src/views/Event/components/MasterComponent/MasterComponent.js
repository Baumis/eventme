import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Text from '../contentTypes/Text/Text'
import Guests from '../contentTypes/Guests/Guests'
import InviteLink from '../contentTypes/InviteLink/InviteLink'
import './MasterComponent.css'
import { FaCog } from 'react-icons/fa'
import EditorPanel from './EditorPanel/EditorPanel'

class MasterComponent extends Component {

    state = {
        editMode: false,
        components: {
            TEXT: Text,
            GUESTS: Guests,
            INVITE_LINK: InviteLink
        }
    }

    changeComponentData = (data) => {
        this.props.EventStore.editComponentData(this.props.component.order, data)
    }

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode })
    }

    render() {
        const buttonMode = this.state.editMode ? 'editButtonActive' : ''
        const masterMode = this.state.editMode ? 'editMasterActive' : ''
        const TagName = this.state.components[this.props.component.type || 'TEXT']
        return (
            <div className={"master-component " + masterMode}>
                {this.state.editMode ?
                    <EditorPanel />
                    : null
                }
                {this.props.isCreator() ?
                    <div className="master-options-row">
                        <div className={"master-options-edit-button " + buttonMode}
                            onClick={this.toggleEditMode}>
                            <FaCog />
                        </div>
                    </div>
                    : null
                }
                <TagName
                    data={this.props.component.data}
                    edit={this.state.editMode}
                    changeData={this.changeComponentData}
                />
            </div>
        )
    }
}
export default inject('VisibilityStore', 'EventStore')(observer(MasterComponent))