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
        this.setState({ activeTab: tab})
    }

    tabSwitch = () => {
        switch (this.state.activeTab) {
            case 'general':
                return <GeneralOptions
                    user={this.props.user}
                    save={this.props.save}
                />
            case 'password':
                return <PasswordOptions />
        }
    }

    render() {
        return (
            <div className="settings-container">
                <SettingsTabs setTab={this.setTab}/>
                {this.tabSwitch()}
            </div >
        )
    }
}

export default SettingsContainer