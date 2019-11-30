import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import UserServices from '../../services/users'
import ProfileHeader from './components/ProfileHeader/ProfileHeader'
import ProfileContent from './components/ProfileContent/ProfileContent'
import ProfileTabs from './components/ProfileTabs/ProfileTabs'
import Navbar from '../../commonComponents/Navbar/Navbar'
import NewEventModal from '../../commonComponents/NewEventModal/NewEventModal'
import NotFound from '../NotFound/NotFound'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parameterId: null,
            user: null,
            loading: true,
            idValid: true,
            newEventModal: false,
            activeTab: 'MyEvents'
        }
    }

    async componentDidMount() {
        if (this.props.verificationToken) {
            await UserServices.verifyEmail(this.props.profileId, this.props.verificationToken)
            window.location.replace(`/profile/${this.props.profileId}`)
        } else {
            await this.getUserInformation()
            this.setState({ parameterId: this.props.profileId, loading: false })
        }
    }

    async componentDidUpdate() {
        if (this.state.parameterId !== this.props.profileId) {
            this.setState({ parameterId: this.props.profileId, activeTab: 'MyEvents' })
            await this.getUserInformation()
        }
    }

    getUserInformation = async () => {
        try {
            const user = await UserServices.getOne(this.props.profileId)
            if (user) {
                this.setState({ user: user })
            }
        } catch (error) {
            this.setState({ idValid: false })
        }
    }

    changeActive = (cathegory) => {
        this.setState({ activeTab: cathegory })
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

    saveUserValues = async (userValues) => {
        const user = await this.props.UserStore.saveUser(userValues)
        if (user) {
            this.setState({ user: user })
        }
        return user
    }

    render() {

        if (this.state.loading) {
            return null
        }

        if (!this.state.idValid) {
            return (
                <NotFound
                    title={'Profile not found'}
                    message={'The profile you are looking for is removed or you don\'t have permission to view it.'}
                />
            )
        }

        return (
            <div className="profileViewContainer">
                <Navbar />
                <ProfileHeader
                    user={this.state.user}
                    toggleOptions={this.toggleUserOptionsModal}
                />
                <ProfileTabs
                    changeActive={this.changeActive}
                    active={this.state.activeTab}
                    isOwner={this.isOwner()}
                />
                <ProfileContent
                    user={this.state.user}
                    isOwner={this.isOwner()}
                    save={this.saveUserValues}
                    newEvent={this.toggleNewEventModal}
                    activeTab={this.state.activeTab}
                />
                {this.state.newEventModal ?
                    <NewEventModal
                        hide={this.toggleNewEventModal}
                    />
                    : null}
            </div>
        )
    }
}

export default inject('UserStore')(observer(Profile))