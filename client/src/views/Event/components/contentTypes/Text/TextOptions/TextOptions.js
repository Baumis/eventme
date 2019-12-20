import React, { Component } from 'react'
import './TextOptions.css'
import OptionInput from '../../components/OptionInput/OptionInput'
import EditableWrapper from '../../../EditableWrapper/EditableWrapper'
import DefaultButtons from '../../../../../../commonComponents/UniversalModal/DefaultButtons/DefaultButtons'

class TextOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            component: JSON.parse(JSON.stringify(this.props.component))
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
                        style={{textAlign: 'center'}}
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
                <DefaultButtons
                    positiveLabel={this.props.positiveLabel}
                    negativeLabel={this.props.negativeLabel}
                    positiveAction={() => this.props.positiveAction(this.state.component.data)}
                    negativeAction={this.props.negativeAction}
                />
            </div>
        )
    }
}

export default TextOptions