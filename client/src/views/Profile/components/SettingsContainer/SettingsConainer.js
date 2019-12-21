import React, { Component } from 'react'
import './SettingsContainer.css'
import GeneralOptions from './GeneralOptions/GeneralOptions'
import SettingsTabs from './SettingsTabs/SettingsTabs'
import PasswordOptions from './PasswordOptions/PasswordOptions'

class SettingsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'general'
        }
    }

    setTab = (tab) => {
        this.setState({ activeTab: tab })
    }

    render() {
        return (
            <div className="settings-container">
                <SettingsTabs
                    setTab={this.setTab}
                    activeTab={this.state.activeTab}
                />
                <div className="settings-content-container">
                    <div className={this.state.activeTab === "general" ? "general-options-wrapper active-options-wrapper" : "general-options-wrapper"}>
                        <GeneralOptions
                            user={this.props.user}
                            save={this.props.save}
                            active={this.state.activeTab === 'general'}
                        />
                    </div>
                    <div className={this.state.activeTab === "password" ? "password-options-wrapper active-options-wrapper" : "password-options-wrapper"}>
                        <PasswordOptions />
                    </div>
                </div>
            </div >
        )
    }
}

export default SettingsContainer