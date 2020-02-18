import React, { Component } from 'react'
import './GeneralOptions.css'
import { inject, observer } from 'mobx-react'
import Spinner from '../../../../../commonComponents/Spinner/Spinner'

class GeneralOptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userValues: { ...this.props.user },
            saved: true,
            loading: false,
            uploadingCover: false,
            uploadingAvatar: false
        }
    }

    uploadAvatarFile = async (event) => {
        if (this.state.uploadingAvatar) {
            return
        }

        this.setState({ uploadingAvatar: true })
        const picture = await this.props.UserStore.uploadUserAvatar(event.target.files[0])
        this.setState({ uploadingAvatar: false })

        if (picture) {
            const values = this.state.userValues
            values.avatar = picture
            this.setState({ userValues: values, saved: false })
        } else {
            this.props.VisibilityStore.showAlert(
                'Fail',
                `Uploading photo failed`,
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
        }
    }

    uploadCoverFile = async (event) => {
        if (this.state.uploadingCover) {
            return
        }

        this.setState({ uploadingCover: true })
        const picture = await this.props.UserStore.uploadUserCover(event.target.files[0])
        this.setState({ uploadingCover: false })

        if (picture) {
            const values = this.state.userValues
            values.cover = picture
            this.setState({ userValues: values, saved: false })
        } else {
            this.props.VisibilityStore.showAlert(
                'Fail',
                `Uploading photo failed`,
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
        }
    }


    changeUserValue = (event) => {
        const values = this.state.userValues
        values[event.target.name] = event.target.value
        this.setState({ userValues: values, saved: false })
    }

    saveOptions = async () => {
        if (this.state.loading || this.state.saved) {
            return
        }

        this.setState({ loading: true })
        const user = await this.props.save(this.state.userValues)
        this.setState({ loading: false })

        if (user) {
            this.setState({ saved: true })
        } else {
            this.props.VisibilityStore.showAlert(
                'Fail',
                'options could not be saved',
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
        }
    }

    render() {
        return (
            <div className="general-options-container">
                <h2>General Settings</h2>
                <div className="general-options-input">
                    <div className="general-options-input-label">
                        Name
                    </div>
                    <div className="general-options-input-input">
                        <input
                            name={'name'}
                            value={this.state.userValues.name}
                            onChange={this.changeUserValue}
                        />
                    </div>
                </div>
                <div className="general-options-input">
                    <div className="general-options-input-label">
                        Email
                        </div>
                    <div className="general-options-input-input">
                        <input
                            name={'email'}
                            value={this.state.userValues.email}
                            onChange={this.changeUserValue}
                        />
                    </div>
                </div>
                <div className="general-options-input">
                    <div className="general-options-input-label">
                        Cover
                    </div>
                    <div className="general-options-input-input">
                        <label htmlFor="upload-cover" className="general-options-input-button">
                            {this.state.uploadingCover ?
                                <Spinner />
                                :
                                <div>Browse</div>
                            }
                        </label>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            id="upload-cover"
                            accept="image/*"
                            onChange={this.uploadCoverFile}
                        />
                        <input
                            name={'cover'}
                            value={this.state.userValues.cover}
                            onChange={this.changeUserValue}
                        />
                    </div>
                </div>
                {this.props.UserStore.currentUser.userType === 'GOOGLE' ||
                    this.props.UserStore.currentUser.userType === 'FACEBOOK' ?
                    null
                    :
                    <div className="general-options-input">
                        <div className="general-options-input-label">
                            Avatar
                    </div>
                        <div className="general-options-input-input">
                            <label htmlFor="upload-avatar" className="general-options-input-button">
                                {this.state.uploadingAvatar ?
                                    <Spinner />
                                    :
                                    <div>Browse</div>
                                }
                            </label>
                            <input
                                type="file"
                                id="upload-avatar"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={this.uploadAvatarFile}
                            />
                            <input
                                name={'avatar'}
                                value={this.state.userValues.avatar}
                                onChange={this.changeUserValue}
                            />
                        </div>
                    </div>
                }
                <div className="general-options-button-row">
                    <div className="general-options-save-button" onClick={() => this.saveOptions()}>
                        {this.state.loading ?
                            <Spinner />
                            :
                            <div>Save</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(GeneralOptions))