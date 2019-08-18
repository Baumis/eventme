import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ComponentEditor.css'
import TextOptions from './TypeOptions/TextOptions'
import GuestsOptions from './TypeOptions/GuestsOptions'
import InviteLinkOptions from './TypeOptions/InviteLinkOptions'
import { FaPen, FaTimes, FaList, FaLink } from 'react-icons/fa'


class ComponentEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            component: props.component,
            order: props.component.order,
            activeType: props.component.type,
            types: {
                TEXT: TextOptions,
                GUESTS: GuestsOptions,
                INVITE_LINK: InviteLinkOptions
            },
            data: props.component.data
        }
    }

    activeCSS = {
        border: '1px solid white',
        color: 'white'
    }

    changeType = (type) => {
        this.setState({ activeType: type })
    }

    updateData = (data) => {
        this.setState({ data: data })
    }

    saveData = () => {
        this.props.EventStore.saveComponentData(this.state.order, this.state.data, this.state.activeType)
        this.props.VisibilityStore.closeComponentEditor()
        console.log(this.props.EventStore.event.components)
    }

    render() {
        const TagName = this.state.types[this.state.activeType]
        return (
            <div className="ModalBackground" >
                <div className="EditorContainer">
                    <div className="TypeRow">
                        <div className="TypeItem" onClick={() => this.changeType('TEXT')} id={this.state.activeType === 'TEXT' ? 'TypeActive' : 'TypeNormal'}>
                            <FaPen />
                            <label>Text</label>
                        </div>
                        <div className="TypeItem" onClick={() => this.changeType('GUESTS')} id={this.state.activeType === 'GUESTS' ? 'TypeActive' : 'TypeNormal'}>
                            <FaList />
                            <label>Guests</label>
                        </div>
                        <div className="TypeItem" onClick={() => this.changeType('INVITE_LINK')} id={this.state.activeType === 'INVITE_LINK' ? 'TypeActive' : 'TypeNormal'}>
                            <FaLink />
                            <label>Invite</label>
                        </div>
                    </div>
                    <div className="SettingsContent">
                        <div className="exitRow" onClick={this.props.close}>
                            <div className="exitIcon"><FaTimes /></div>
                        </div>
                        <TagName
                            component={this.state.component}
                            updateData={this.updateData}
                        />
                        <div className="ButtonRow">
                            <button onClick={() => this.saveData()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore', 'VisibilityStore')(observer(ComponentEditor))