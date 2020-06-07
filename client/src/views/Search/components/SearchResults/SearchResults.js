import React, { useState } from 'react'
import './SearchResults.css'
import { withRouter } from 'react-router-dom'
import Spinner from '../../../../commonComponents/Spinner/Spinner'
import EventCard from '../../../Profile/components/EventCard/EventCard'

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

    const toProfile = (id) => {
        props.history.push(`/profile/${id}`)
    } 

    return (
        <div className="search-results">
            <div className="search-results-container">
                {props.results.events.length > 0 &&
                    <div className="result-list">
                        <div className="result-title">Events</div>
                        {props.results.events.map(event =>
                            <EventCard event={event} />
                        )}
                    </div>
                }
                {props.results.users.length > 0 &&
                    <div className="result-list">
                        <div className="result-title">Profiles</div>
                        {props.results.users.map(user =>
                            <div className="profile-result" onClick={() => toProfile(user._id)}>
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