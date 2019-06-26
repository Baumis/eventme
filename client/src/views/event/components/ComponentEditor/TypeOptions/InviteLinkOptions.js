import React, { Component } from 'react'
import '../ComponentEditor.css'
import { FaInfo } from 'react-icons/fa'


class GuestsOptions extends Component {

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
                    <p>{'This component displays a public invite url for your guests'}</p>
                </div>
            </div>
        )
    }
}
export default GuestsOptions