import React, { Component } from 'react'
import './PictureOptions.css'
import OptionInput from '../../components/OptionInput/OptionInput'
import { FaAppleAlt } from 'react-icons/fa'

class PictureOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            component: { ...this.props.component }
        }
    }

    changeUrl = (event) => {
        const componentClone = { ...this.state.component }
        componentClone.data.url = event.target.value
        this.setState({ component: componentClone })
    }

    changeExpand = (isExpanded) => {
        const componentClone = { ...this.state.component }
        componentClone.data.expand = isExpanded
        this.setState({ component: componentClone })
    }

    expandButtonClass = (buttontype) => {
        return this.state.component.data.expand === buttontype ? ' chosen-button' : ''
    }

    applyChanges = () => {
        this.props.changeData(this.state.component.data)
        this.props.close()
    }

    render() {
        return (
            <div className="picture-options">
                <div className="picture-options-header">Picture component</div>
                <div className="picture-options-container">
                    <OptionInput
                        label={'Picture Url'}
                        value={this.state.component.data.url}
                        changeValue={this.changeUrl}
                        placeholder={'picture url'}
                    />
                    <div className="picture-options-expand">
                        <label>Picture fit</label>
                        <div className="picture-options-expand-buttons">
                            <div className="picture-options-expand-section">
                                <div className={"picture-options-expand-button" + this.expandButtonClass(true)} onClick={() => this.changeExpand(true)}>
                                    <div className="picture-options-compress-icon">
                                        <FaAppleAlt />
                                    </div>
                                </div>
                                Compress
                            </div>
                            <div className="picture-options-expand-section">
                                <div className={"picture-options-expand-button" + this.expandButtonClass(false)} onClick={() => this.changeExpand(false)}>
                                    <div className="picture-options-expand-icon">
                                        <FaAppleAlt />
                                    </div>
                                </div>
                                Expand
                            </div>
                        </div>
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

export default PictureOptions