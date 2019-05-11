import React, { Component } from 'react'
import '../ComponentEditor.css'
import { FaInfo } from 'react-icons/fa'


class GuestsOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        if (this.props.component.type === 'Guests') {
            this.setState({
                title: this.props.component.data.title,
            })
        }
    }

    render() {
        return (
            <div className="DataSettings">
                <div className="headerRow">
                    <h4>Guests</h4>
                </div>
                <div className="SettingInfo">
                    <div className="InfoTitleRow">
                        <FaInfo />
                        <label>Info</label>
                    </div>
                    <p>{'The guest-component displays the event\'s guest and their status'}</p>
                </div>
            </div>
        )
    }
}
export default GuestsOptions