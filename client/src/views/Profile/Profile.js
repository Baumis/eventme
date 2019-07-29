import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import UserServices from '../../services/users'
import ProfileHeader from './components/ProfileHeader/ProfileHeader'
import EventContainer from './components/EventContainer/EventContainer'
import Navbar from '../../commonComponents/Navbar/Navbar'
import NewEventModal from '../../commonComponents/NewEventModal/NewEventModal'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loading: true,
            idValid: true,
            newEventModal: false
        }
    }

    async componentDidMount() {
        try {
            const user = await UserServices.getOne(this.props.profileId)
            if (user) {
                this.setState({ user: user })
            }
        } catch (error) {
            this.setState({ idValid: false })
        }
        this.setState({ loading: false })
    }

    toggleEventModal = () => {
        this.setState({ newEventModal: !this.state.newEventModal })
    }

    render() {

        if (this.state.loading) {
            return null
        }

        if (!this.state.idValid) {
            return null
        }

        return (
            <div className="profileViewContainer">
                <Navbar />
                <ProfileHeader user={this.state.user} />
                <EventContainer
                    user={this.state.user}
                    newEvent={this.toggleEventModal}
                />
                {this.state.newEventModal ?
                    <NewEventModal hide={this.toggleEventModal} />
                    : null}
            </div>
        )
    }
}

export default inject('UserStore')(observer(Profile))