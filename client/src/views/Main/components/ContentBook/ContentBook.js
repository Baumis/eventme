import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './ContentBook.css'
import CreateEventForm from '../../../../commonComponents/CreateEventForm/CreateEventForm'
import InformationPage from '../InformationPage/InformationPage'

class ContentBook extends Component {

    render() {
        return (
            <div className="content-book">
                <div className="content-book-page">
                    <div className="content-book-form-wrapper">
                        <CreateEventForm />
                    </div>
                </div>
                <div className="content-book-devider"></div>
                <div className="content-book-page">
                    <InformationPage />
                </div>
            </div>
        )
    }
}

export default inject('UserStore')(observer(ContentBook))