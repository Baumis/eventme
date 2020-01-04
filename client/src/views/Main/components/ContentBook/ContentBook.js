import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ContentBook.css'
import CreateEventForm from '../CreateEventForm/CreateEventForm'
import InformationPage from '../InformationPage/InformationPage'

class ContentBook extends Component {

    render() {
        return (
            <div className="content-book">
                <CreateEventForm />
                <div className="content-book-devider"></div>
                <InformationPage />
            </div>
        )
    }
}

export default inject('UserStore')(observer(ContentBook))