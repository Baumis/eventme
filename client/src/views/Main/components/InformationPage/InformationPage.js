import React, { Component } from 'react'
import './InformationPage.css'
import { FaRocket } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

class InformationPage extends Component {

    toSearch = () => {
        if (this.props.VisibilityStore.signModal) {
            this.props.VisibilityStore.closeSignModal()
        }
        this.props.history.push(`/search`)
    }

    render() {
        return (
            <div className="information-page" >
                <div className="information-page-icon-row">
                    <div className="information-page-icon">
                        <FaRocket />
                    </div>
                </div>
                <div className="information-page-title">
                    Create events fast.
            </div>
                <div className="information-page-paragraph">
                    Fill out the short form to create a new event. Invite guests by sharing the link to the event page.
            </div>
                <div className="information-page-search-button"
                    onClick={this.toSearch}>
                    Search events and profiles
                </div>
            </div>
        )
    }
}

export default withRouter(inject('VisibilityStore')(observer(InformationPage)))