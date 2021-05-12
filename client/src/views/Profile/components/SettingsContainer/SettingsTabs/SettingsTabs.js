import React from 'react'
import './SettingsTabs.css'

const SettingsTabs = (props) => {

    const getActivityClass = (tabName) => {
        return props.activeTab === tabName ? ' settings-tab-active' : ''
    }

    return (
        <div className="settings-tabs">
            <div className={'settings-tab ' + getActivityClass('general')} onClick={() => props.setTab('general')}>
                General
            </div>
            <div className={'settings-tab ' + getActivityClass('password')} onClick={() => props.setTab('password')}>
                Password
            </div>
        </div>
    )
}

export default SettingsTabs