import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Text from '../contentTypes/Text/Text'
import TextOptions from '../contentTypes/Text/TextOptions/TextOptions'
import Picture from '../contentTypes/Picture/Picture'
import PictureOptions from '../contentTypes/Picture/PictureOptions/PictureOptions'
import Vote from '../contentTypes/Vote/Vote'
import VoteOptions from '../contentTypes/Vote/VoteOptions/VoteOptions'
import Form from '../contentTypes/Form/Form'
import FromOptions from '../contentTypes/Form/FormOptions/FormOptions'
import './MasterComponent.css'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import EditorPanel from './EditorPanel/EditorPanel'

class MasterComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            components: {
                TEXT: { type: Text, options: TextOptions },
                PICTURE: { type: Picture, options: PictureOptions },
                VOTE: { type: Vote, options: VoteOptions },
                FORM: { type: Form, options: FromOptions }
            }
        }
    }

    changeComponentData = (data) => {
        this.props.EventStore.editComponentData(this.props.index, data)
        this.props.closeModal()
    }

    render() {
        const buttonMode = this.props.editable ? 'editButtonActive' : ''
        const masterMode = this.props.editable ? 'editMasterActive' : ''
        const panelMarginTop = this.props.editable ? '0px' : '-40px'
        const component = this.state.components[this.props.component.type]
        if (!component) {
            return null
        }
        const ComponentType = component.type
        const ComponentOptions = component.options
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
                                negativeAction={this.props.closeModal}
                                positiveAction={this.changeComponentData}
                                positiveLabel={'Apply'}
                                negativeLabel={'Close'}
                            />
                        )}
                />

                <ComponentType
                    component={this.props.component}
                    edit={this.props.editable}
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