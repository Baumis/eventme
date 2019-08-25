import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Text from '../contentTypes/Text/Text'
import Guests from '../contentTypes/Guests/Guests'
import InviteLink from '../contentTypes/InviteLink/InviteLink'
import './MasterComponent.css'
import { FaEdit } from 'react-icons/fa'

class MasterComponent extends Component {

    state = {
        editMode: false,
        components: {
            TEXT: Text,
            GUESTS: Guests,
            INVITE_LINK: InviteLink
        }
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
                {this.props.isCreator() ?
                    <div className="master-options-row">
                        <div className={"master-options-edit-button " + buttonMode}
                            onClick={this.toggleEditMode}>
                            <FaEdit />
                        </div>
                    </div>
                    : null
                }
                <TagName data={this.props.component.data} />
            </div>
        )
    }
}
export default inject('VisibilityStore')(observer(MasterComponent))