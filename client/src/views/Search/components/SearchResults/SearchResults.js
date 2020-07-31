import React, { useState } from 'react'
import './SearchResults.css'
import { withRouter } from 'react-router-dom'
import Spinner from '../../../../commonComponents/Spinner/Spinner'
import EventCard from '../../../../views/Profile/components/EventCard/EventCard'

const SearchResults = (props) => {

    const getAvatar = (avatar) => {
        if (!avatar) {
            return { backgroundImage: `url(${require('../../../../assets/avatar.png')})` }
        }
        return { backgroundImage: `url(${avatar})` }
    }

    if (props.searching) {
        return <div className="search-results"> <Spinner /> </div>
    }

    const getCardMode = () => {
        return props.users.length > 0
    }

    const toProfile = (id) => {
        props.history.push(`/profile/${id}`)
    } 

    return (
        <div className="search-results">
            <div className="search-results-container">
                {props.searchTab === 'events' ?
                    <div className="result-list">
                        <div className="result-title">Events</div>
                        {props.events.map(event =>
                            <EventCard smallCard={getCardMode()} event={event} key={event._id} />
                        )}
                    </div>
                    :
                    <div className="result-list">
                        <div className="result-title">Profiles</div>
                        {props.users.map(user =>
                            <div className="profile-result" onClick={() => toProfile(user._id)} key={user._id}>
                                <div style={getAvatar(user.avatar)} className="profile-result-avatar"> </div>
                                <div>{user.name}</div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(SearchResults)