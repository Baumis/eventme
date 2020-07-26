import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './Navigation.css'
import { FaRocket, FaSearch } from 'react-icons/fa'

class Navigation extends Component {

    toSearch = () => {
        if (this.props.VisibilityStore.signModal) {
            this.props.VisibilityStore.closeSignModal()
        }
        this.props.history.push(`/search`)
    }

    scrollToCreate = () => {
        const createSection = document.getElementById('create-event-section').offsetTop
        window.scroll({left: 0, top: createSection, behavior: 'smooth'})
    }

    render() {
        return (
            <div className="main-navigation">
                <div className="navigation-content">
                    <div className="navigation-column">
                        <div className="navigation-icon-row">
                            <div className="navigation-icon">
                                <FaRocket />
                            </div>
                        </div>
                        <div className="navigation-title">
                            Create events.
                            </div>
                        <div className="navigation-paragraph">
                            Fill out the short form to create a new event. Invite guests by sharing the link to the event page.
                            </div>
                        <div className="navigation-button" onClick={this.scrollToCreate}>
                            Create event
                        </div>
                    </div >
                    <div className="navigation-column">
                        <div className="navigation-icon-row">
                            <div className="navigation-icon">
                                <FaSearch />
                            </div>
                        </div>
                        <div className="navigation-title">
                            Find events and organizers.
                            </div>
                        <div className="navigation-paragraph">
                            Fill out the short form to create a new event. Invite guests by sharing the link to the event page.
                            </div>
                        <div className="navigation-button navigation-button-search" onClick={this.toSearch}>
                            Search events
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(inject('VisibilityStore')(Navigation))