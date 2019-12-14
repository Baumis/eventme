import React, { Component } from 'react'
import './VoteOptions.css'
import OptionInput from '../../components/OptionInput/OptionInput'
import { FaTrash } from 'react-icons/fa'

class VoteOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            component: { ...this.props.component }
        }
    }

    changeSubject = (event) => {
        const componentClone = this.state.component
        componentClone.data.subject = event.target.value
        this.setState({ component: componentClone })
    }

    changeOption = (optionIndex, event) => {
        const componentClone = this.state.component
        componentClone.data.options[optionIndex].label = event.target.value
        this.setState({ component: componentClone })
    }

    addNewOption = () => {
        const option = {
            label: 'new option',
            votes: []
        }
        const componentClone = this.state.component
        componentClone.data.options.push(option)
        this.setState({ component: componentClone })
    }

    removeOption = (optionIndex) => {
        const componentClone = this.state.component
        componentClone.data.options.splice(optionIndex, 1)
        this.setState({ component: componentClone })
    }

    applyChanges = () => {
        this.props.changeData(this.state.component.data)
        this.props.close()
    }

    render() {
        return (
            <div className="vote-options">
                <div className="vote-options-header">
                    Vote component
                </div>
                <div className="vote-options-container">
                    <OptionInput
                        label={'Subject'}
                        value={this.state.component.data.subject}
                        changeValue={this.changeSubject}
                    />
                    <div className="vote-options-option-list">
                        <div className="vote-options-label">Options</div>
                        {this.state.component.data.options.map((option, i) =>
                            <div key={i} className="vote-options-option">
                                <div className="vote-delete-button" onClick={() => this.removeOption(i)}>
                                    <FaTrash />
                                </div>
                                <input
                                    value={option.label}
                                    onChange={(event) => this.changeOption(i, event)}
                                />
                            </div>
                        )}
                        {this.state.component.data.options.length < 4 ?
                            <div className="vote-component-add-button" onClick={() => this.addNewOption()}>
                                add option
                        </div>
                            : null}
                    </div>
                </div>
                <div className="picture-options-button-row">
                    <div className="picture-options-close-button" onClick={() => this.props.close()}>
                        Close
                    </div>
                    <div className="picture-options-apply-button" onClick={this.applyChanges}>
                        Apply
                    </div>
                </div>
            </div>
        )
    }
}

export default VoteOptions