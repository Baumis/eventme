import React, { Component } from 'react'
import './AboutEditor.css'
import { inject, observer } from 'mobx-react'
import DefaultButtons from '../../../../../commonComponents/UniversalModal/DefaultButtons/DefaultButtons'

class AboutEditor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            description: this.props.EventStore.event.description
        }
    }

    changeDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    applyChanges = () => {
        this.props.EventStore.setValue(this.state.description, 'description')
        this.props.close()
    }

    render() {
        return (
            <div className="about-editor">
                <div className="about-editor-header">Edit description</div>
                <div className="about-editor-container">
                    <div className="about-editor-textarea">
                        <textarea
                            value={this.state.description}
                            className={'about-editor-textarea-area'}
                            onChange={this.changeDescription}
                        />
                    </div>
                </div>
                <DefaultButtons
                    positiveLabel={'Apply'}
                    negativeLabel={'close'}
                    positiveAction={this.applyChanges}
                    negativeAction={this.props.close}
                />
            </div>
        )
    }
}

export default inject('EventStore')(observer(AboutEditor))