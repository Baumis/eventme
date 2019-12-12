import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ComponentContainer.css'
import MasterComponent from '../MasterComponent/MasterComponent.js'
import ComponentAdder from './ComponentAdder/ComponentAdder'
import UniversalModal from '../../../../commonComponents/UniversalModal/UniversalModal'

class ComponentContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: null,
            modalContent: null,
            showModal: false
        }
    }

    openModalWithContent = (modalContent) => {
        this.setState({
            showModal: true,
            modalContent: modalContent
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    setEditable = (index) => {
        const value = index === this.state.editable ? null : index
        this.setState({ editable: value })
    }

    moveEditableBackward = () => {
        if (this.state.editable > 0) {
            this.setState({ editable: this.state.editable - 1 })
        } else {
            this.setState({ editable: this.props.EventStore.event.components.length - 1 })
        }
    }

    moveEditableForward = () => {
        if (this.props.EventStore.event.components.length !== this.state.editable + 1) {
            this.setState({ editable: this.state.editable + 1 })
        } else {
            this.setState({ editable: 0 })
        }
    }

    render() {
        return (
            <div className="component-container">
                {this.state.showModal ?
                    <UniversalModal
                        content={this.state.modalContent}
                    />
                    : null}
                <div className="component-container-grid">
                    {this.props.EventStore.event.components.map((component, i) => (
                        <MasterComponent
                            key={i}
                            index={i}
                            editable={i === this.state.editable}
                            setEditable={this.setEditable}
                            moveEditableForward={this.moveEditableForward}
                            moveEditableBackward={this.moveEditableBackward}
                            component={component}
                            isCreator={this.props.isCreator}
                            isGuest={this.props.isGuest}
                            openModal={this.openModalWithContent}
                            closeModal={this.closeModal}
                        />
                    ))}
                </div>
                {this.props.isCreator() ?
                    <ComponentAdder add={this.props.toggleNewComponentModal} />
                    : null}
            </div>
        )
    }
}
export default inject('EventStore', 'VisibilityStore')(observer(ComponentContainer))