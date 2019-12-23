import React, { useEffect, useState } from 'react'
import './SettingsContainer.css'
import GeneralOptions from './GeneralOptions/GeneralOptions'
import SettingsTabs from './SettingsTabs/SettingsTabs'
import PasswordOptions from './PasswordOptions/PasswordOptions'


const SettingsContainer = (props) => {
    const [activeTab, setActiveTab] = useState('general')
    const [smallScreen, setSmallScreen] = useState(false)

    useEffect(() => {
        updateScreenSize()
        window.addEventListener("resize", updateScreenSize)
        return () => window.removeEventListener("resize", updateScreenSize)
    })

    const updateScreenSize = () => {
        const isSmall = window.innerWidth < 620
        if (isSmall !== smallScreen) setSmallScreen(isSmall)
    }

    const isRendered = (tabName) => {
        return smallScreen || activeTab === tabName
    }

    return (
        <div className="settings-container">
            <SettingsTabs
                setTab={setActiveTab}
                activeTab={activeTab}
            />
            <div className="settings-content-container">
                {isRendered('general') ?
                    < GeneralOptions
                        user={props.user}
                        save={props.save}
                    /> : null}
                {isRendered('password') ?
                    <PasswordOptions /> : null}
            </div>
        </div >
    )
}

export default SettingsContainer