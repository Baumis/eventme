import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import UserServices from '../../services/users'
import ProfileHeader from './components/ProfileHeader/ProfileHeader'
import EventContainer from './components/EventContainer/EventContainer'
import Navbar from '../../commonComponents/Navbar/Navbar'
import NewEventModal from '../../commonComponents/NewEventModal/NewEventModal'
import UserOptions from './components/UserOptions/UserOptions'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loading: true,
            idValid: true,
            newEventModal: false,
            userOptionsModal: false
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

    isOwner = () => {
        if (!this.props.UserStore.currentUser) {
            return false
        }
        return this.props.UserStore.currentUser._id === this.state.user._id
    }

    toggleNewEventModal = () => {
        this.setState({ newEventModal: !this.state.newEventModal })
    }

    toggleUserOptionsModal = () => {
        this.setState({ userOptionsModal: !this.state.userOptionsModal })
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
                <ProfileHeader
                    user={this.state.user}
                    isOwner={this.isOwner()}
                    toggleOptions={this.toggleUserOptionsModal}
                />
                <EventContainer
                    user={this.state.user}
                    newEvent={this.toggleNewEventModal}
                />
                {this.state.newEventModal ?
                    <NewEventModal
                        hide={this.toggleNewEventModal}
                    />
                    : null}
                {this.state.userOptionsModal ?
                    <UserOptions
                        toggleOptions={this.toggleUserOptionsModal}
                        user={this.state.user}
                    />
                    : null}
            </div>
        )
    }
}

export default inject('UserStore')(observer(Profile))