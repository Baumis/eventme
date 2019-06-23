import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ComponentEditor.css'
import TextOptions from './TypeOptions/TextOptions'
import MapOptions from './TypeOptions/MapOptions'
import GuestsOptions from './TypeOptions/GuestsOptions'
import InviteLinkOptions from './TypeOptions/InviteLinkOptions'
import { FaLocationArrow, FaPen, FaTimes, FaList, FaLink } from 'react-icons/fa'


class ComponentEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            component: props.component,
            order: props.component.order,
            activeType: props.component.type,
            types: {
                Text: TextOptions,
                Map: MapOptions,
                Guests: GuestsOptions,
                InviteLink: InviteLinkOptions
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
                        <div className="TypeItem" onClick={() => this.changeType('Text')} id={this.state.activeType === 'Text' ? 'TypeActive' : 'TypeNormal'}>
                            <FaPen />
                            <label>Text</label>
                        </div>
                        <div className="TypeItem" onClick={() => this.changeType('Map')} id={this.state.activeType === 'Map' ? 'TypeActive' : 'TypeNormal'}>
                            <FaLocationArrow />
                            <label>Map</label>
                        </div>
                        <div className="TypeItem" onClick={() => this.changeType('Guests')} id={this.state.activeType === 'Guests' ? 'TypeActive' : 'TypeNormal'}>
                            <FaList />
                            <label>Guests</label>
                        </div>
                        <div className="TypeItem" onClick={() => this.changeType('InviteLink')} id={this.state.activeType === 'InviteLink' ? 'TypeActive' : 'TypeNormal'}>
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