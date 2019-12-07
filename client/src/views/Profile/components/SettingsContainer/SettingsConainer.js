import React, { Component } from 'react'
import './SettingsContainer.css'
import GeneralOptions from './GeneralOptions/GeneralOptions'
import SettingsTabs from './SettingsTabs/SettingsTabs'
import PasswordOptions from './PasswordOptions/PasswordOptions'

class SettingsContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'general',
            smallScreen: false
        }
    }

    componentDidMount() {
        window.addEventListener("resize", () => this.updateScreenSize())
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateScreenSize)
    }

    updateScreenSize() {
        const isSmall = window.innerWidth < 620
        this.setState({ smallScreen: isSmall })
    }

    setTab = (tab) => {
        this.setState({ activeTab: tab })
    }

    tabSwitch = () => {
        if (this.state.smallScreen) {
            return (
                <div>
                    <GeneralOptions
                        user={this.props.user}
                        save={this.props.save}
                    />
                    <PasswordOptions />
                </div>
            )
        }

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
                <SettingsTabs setTab={this.setTab} />
                <div className="settings-content-container">
                    {this.tabSwitch()}
                </div>
            </div >
        )
    }
}

export default SettingsContainer