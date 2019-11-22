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

    state = {
        editMode: false,
        components: {
            TEXT: Text,
            INVITE_LINK: InviteLink,
            PICTURE: Picture,
            VOTE: Vote,
            FORM: Form
        }
    }

    changeComponentData = (data) => {
        this.props.EventStore.editComponentData(this.props.index, data)
    }

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode })
    }

    render() {
        const buttonMode = this.state.editMode ? 'editButtonActive' : ''
        const masterMode = this.state.editMode ? 'editMasterActive' : ''
        const panelMarginTop = this.state.editMode ? '0px' : '-40px'
        const TagName = this.state.components[this.props.component.type || 'TEXT']
        return (
            <div className={'master-component ' + masterMode}>
                {this.props.isCreator() ?
                    <div className="master-options-row">
                        <div className={'master-options-edit-button ' + buttonMode}
                            onClick={this.toggleEditMode}>
                            {this.state.editMode ?
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
                />

                <TagName
                    component={this.props.component}
                    edit={this.state.editMode}
                    changeData={this.changeComponentData}
                    isCreator={this.props.isCreator}
                />
            </div>
        )
    }
}
export default inject('VisibilityStore', 'EventStore')(observer(MasterComponent))