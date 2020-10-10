import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import './Navigation.css'
import { FaRocket, FaSearch, FaFeatherAlt } from 'react-icons/fa'

class Navigation extends Component {

    toSearch = () => {
        if (this.props.VisibilityStore.signModal) {
            this.props.VisibilityStore.closeSignModal()
        }
        this.props.history.push(`/search`)
    }

    scrollToCreate = () => {
        const createSection = document.getElementById('create-event-section').offsetTop
        window.scroll({ left: 0, top: createSection, behavior: 'smooth' })
    }

    getPicture = () => {
        if(window.innerWidth > 600){
            return `url(${require('../../../../assets/FinalPizzaEvent.png')})`;
        } else {
            return `url(${require('../../../../assets/FinalPizzaEventSmall.png')})`;
        }
    }

    render() {
        return (
            <div className="main-navigation">
                <div className="navigation-content">
                    <div className="navigation-text-column">
                        <div className="navigation-icon-row">
                            <div className="navigation-icon">
                                <FaFeatherAlt />
                            </div>
                        </div>
                        <div className="navigation-title">
                            Events made easy.
                            </div>
                        <div className="navigation-paragraph">
                            
Every event needs a page. Inviteowl makes page creation quick and event sharing easy.
                        </div>
                        <div className="navigation-buttons">
                            <div className="navigation-button" onClick={this.scrollToCreate}>
                                Create event
                            </div>
                            <div className="navigation-button navigation-button-search" onClick={this.toSearch}>
                                Search events
                            </div>
                        </div>
                    </div>
                    <div className="navigation-picture-column">
                    <div className="navigation-example" style={{backgroundImage: this.getPicture() }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(inject('VisibilityStore')(Navigation))