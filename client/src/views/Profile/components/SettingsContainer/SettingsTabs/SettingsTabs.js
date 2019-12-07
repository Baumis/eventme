import React from 'react'
import './SettingsTabs.css'

const SettingsTabs = (props) => {

    return (
        <div className="settings-tabs">
            <div className="settings-tab" onClick={() => props.setTab('general')}>
                General
            </div>
            <div className="settings-tab" onClick={() => props.setTab('password')}>
                Password
            </div>
        </div>
    )
}

export default SettingsTabs