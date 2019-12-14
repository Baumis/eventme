import React, { Component } from 'react'
import './TextOptions.css'
import OptionInput from '../../components/OptionInput/OptionInput'
import EditableWrapper from '../../../EditableWrapper/EditableWrapper'

class TextOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            component: { ...this.props.component }
        }
    }

    changeTitle = (event) => {
        const componentClone = { ...this.state.component }
        componentClone.data.title = event.target.value
        this.setState({ component: componentClone })
    }

    changeContent = (event) => {
        const componentClone = { ...this.state.component }
        componentClone.data.content = event.target.value
        this.setState({ component: componentClone })
    }

    applyChanges = () => {
        this.props.changeData(this.state.component.data)
        this.props.close()
    }

    render() {
        return (
            <div className="text-options">
                <div className="text-options-header">Text component</div>
                <div className="text-options-container">
                    <OptionInput
                        label={'Title'}
                        value={this.state.component.data.title}
                        changeValue={this.changeTitle}
                    />
                    <div className="text-options-textarea">
                        <label>Content</label>
                        <EditableWrapper
                            html={this.state.component.data.content}
                            className={"text-options-textarea-area"}
                            editable={false}
                            onChange={this.changeContent}
                        />
                    </div>
                </div>
                <div className="text-options-button-row">
                    <div className="text-options-close-button" onClick={() => this.props.close()}>
                        Close
                    </div>
                    <div className="text-options-apply-button" onClick={this.applyChanges}>
                        Apply
                    </div>
                </div>
            </div>
        )
    }
}

export default TextOptions