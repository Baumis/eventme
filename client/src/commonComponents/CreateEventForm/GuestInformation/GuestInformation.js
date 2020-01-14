import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './GuestInformation.css'
import moment from 'moment'
import CreateInput from '../CreateInput/CreateInput'
import CreateTextArea from '../CreateTextArea/CreateTextArea'
import DefaultButtons from '../../UniversalModal/DefaultButtons/DefaultButtons'

class GuestInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventName: '',
            startDate: '',
            endDate: '',
            today: '',
            description: '',
            loading: false
        }
    }

    componentDidMount() {
        const today = moment(new Date()).format('YYYY-MM-DD')
        this.setState({
            startDate: today,
            endDate: today,
            today: today
        })
    }

    changeStartDate = (event) => {
        this.setState({ startDate: event.target.value })
        if (moment(event.target.value).isAfter(this.state.endDate)) {
            this.setState({ endDate: event.target.value })
        }
    }

    changeEndDate = (event) => {
        this.setState({ endDate: event.target.value })
        if (moment(event.target.value).isBefore(this.state.startDate)) {
            this.setState({ startDate: event.target.value })
        } else {

        }
    }

    changeValue = (field, event) => {
        this.setState({ [field]: event.target.value })
    }

    create = async () => {

        if (this.props.UserStore.currentUser === null) {
            this.props.VisibilityStore.showSignModal(this.create)
            return
        }

        this.setState({ loading: true })
        const event = await this.props.EventStore.create({
            label: this.state.eventName,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description
        })
        this.setState({ loading: false })
        event ?
            this.props.history.push(`/events/${event._id}`)
            :
            this.props.VisibilityStore.showAlert(
                'Creation failed',
                'The event could not be created',
                'OK',
                () => this.props.VisibilityStore.closeAlert()
            )
    }

    render() {
        return (
            <div className="guest-information">
                <div className="guest-information-button-row">
                    <div className="guest-information-status">
                        {`2/2`}
                    </div>
                    <DefaultButtons
                        positiveLabel={'Create'}
                        negativeLabel={'back'}
                        positiveAction={() => this.create()}
                        negativeAction={() => this.props.changePage(1)}
                        showSpinner={this.state.loading}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(inject('EventStore', 'UserStore', 'VisibilityStore')(observer(GuestInformation)))