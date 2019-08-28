import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './NewComponentModal.css'
import { FaPen, FaTimes, FaList, FaLink } from 'react-icons/fa'


class NewComponentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            /*types: {
                'TEXT',
                'GUESTS',
                'INVITE_LINK'
            },*/
        }
    }

    saveData = () => {
        this.props.EventStore.saveComponentData(this.state.order, this.state.data, this.state.activeType)
    }

    render() {
        return (
            <div className="component-modal-background" >
                <div className="component-modal-container">
                    <div className="component-modal-top-row">
                        <div className="component-modal-title">New component</div>
                        <div className="component-modal-exit-icon" onClick={this.props.close} ><FaTimes /></div>
                    </div>
                    <div className="component-modal-button-row">
                        <div className="component-modal-button" >
                            <FaPen />
                            <label>Text</label>
                        </div>
                        <div className="component-modal-button" >
                            <FaList />
                            <label>Guests</label>
                        </div>
                        <div className="component-modal-button" >
                            <FaLink />
                            <label>Invite</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('EventStore')(observer(NewComponentModal))