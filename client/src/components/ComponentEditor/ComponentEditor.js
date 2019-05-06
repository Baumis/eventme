import React, { Component } from 'react'
import './ComponentEditor.css'
import TextOptions from './TypeOptions/TextOptions'
import MapOptions from './TypeOptions/MapOptions'
import { FaLocationArrow, FaPen, FaTimes } from 'react-icons/fa'


class ComponentEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            component: props.component,
            order: props.component.order,
            activeType: props.component.type,
            types: {
                Text: TextOptions,
                Map: MapOptions
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

    render() {
        const TagName = this.state.types[this.state.activeType]
        return (
            <div className="ModalBackground" >
                <div className="EditorContainer">
                    <div className="TypeRow">
                        <div className="TypeItem" onClick={() => this.changeType('Text')}>
                            <FaPen />
                            <label>Text</label>
                        </div>
                        <div className="TypeItem" onClick={() => this.changeType('Map')}>
                            <FaLocationArrow />
                            <label>Map</label>
                        </div>
                    </div>
                    <div className="SettingsContent">
                        <div className="exitRow" onClick={this.props.close}><FaTimes /></div>
                        <TagName
                            component={this.state.component}
                            updateData={this.updateData}
                        />
                        <div className="ButtonRow">
                            <button onClick={() => this.props.saveData(this.state.order, this.state.data)}>
                            Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComponentEditor