import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ProfileHeader from './components/ProfileHeader/ProfileHeader'
import EventContainer from './components/EventContainer/EventContainer'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }

    }

    componentDidMount = async () => {
        await this.props.UserStore.initializeMyEvents()
        this.setState({ loading: false })
    }

    render() {
        return (
            <div className="profileViewContainer">
                <ProfileHeader />
                <EventContainer loading={this.state.loading} history={this.props.history} />
            </div>
        )
    }
}

export default inject('UserStore')(observer(Profile))