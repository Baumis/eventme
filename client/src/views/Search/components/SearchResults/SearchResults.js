import React, { useState } from 'react'
import './SearchResults.css'
import Spinner from '../../../../commonComponents/Spinner/Spinner'

const SearchResults = (props) => {

    if (props.searching) {
        return <div className="search-results"> <Spinner /> </div>
    }

    return (
        <div className="search-results">
            <div className="search-results-container">
                {props.results.events.length > 0 &&
                    <div className="result-list">
                        <div>Events</div>
                        {props.results.events.map(event => {

                        })}
                    </div>
                }
                {props.results.users.length > 0 &&
                    <div className="result-list">
                        <div>Profiles</div>
                        {props.results.users.map(user => {

                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchResults