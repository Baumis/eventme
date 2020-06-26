import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Profile.css'
import { withRouter } from 'react-router-dom'
import UserServices from '../../services/users'
import ProfileHeader from './components/ProfileHeader/ProfileHeader'
import ProfileContent from './components/ProfileContent/ProfileContent'
import Navbar from '../../commonComponents/Navbar/Navbar'
import Footer from '../../commonComponents/Footer/Footer'
import CreateEventForm from '../../commonComponents/CreateEventForm/CreateEventForm'
import UniversalModal from '../.././commonComponents/UniversalModal/UniversalModal'
import SignModal from '../../commonComponents/SignModal/SignModal'
import NotFound from '../NotFound/NotFound'
import Alert from '../../commonComponents/Alert/Alert'

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
        if (window.innerWidth < 650) {
            this.props.history.push(`/create`)
        } else {
            this.setState({ newEventModal: !this.state.newEventModal })
        }
    }

    saveUserValues = async (userValues) => {
        const user = await this.props.UserStore.saveUser(userValues)
        if (user) {
            this.setState({ user: user })
        }
        return user
    }

    afterSign = () => {
        this.getUserInformation()
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
            <div className="profile">
                <Navbar
                    staticColor={true}
                    afterSign={this.afterSign}
                />
                <ProfileHeader
                    user={this.state.user}
                    toggleOptions={this.toggleUserOptionsModal}
                    changeActive={this.changeActive}
                    active={this.state.activeTab}
                    isOwner={this.isOwner()}
                    active={this.state.activeTab}
                />
                <ProfileContent
                    user={this.state.user}
                    isOwner={this.isOwner()}
                    save={this.saveUserValues}
                    newEvent={this.toggleNewEventModal}
                    activeTab={this.state.activeTab}
                />
                <Footer />
                {this.props.VisibilityStore.signModal ?
                    <UniversalModal
                        content={<SignModal />}
                    />
                    : null}
                {this.state.newEventModal ?
                    <UniversalModal
                        content={
                            <div className="profile-create-form-wrapper">
                                <CreateEventForm
                                    negativeAction={this.toggleNewEventModal}
                                    negativeLabel={'Close'}
                                />
                            </div>
                        }
                    />
                    : null}
                {this.props.VisibilityStore.alert ?
                    <Alert />
                    : null}
            </div>
        )
    }
}

export default withRouter(inject('UserStore', 'VisibilityStore')(observer(Profile)))