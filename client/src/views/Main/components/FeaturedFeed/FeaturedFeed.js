import React, { useState, useEffect } from 'react'
import './FeaturedFeed.css'
import { withRouter } from 'react-router-dom'
import EventFeed from '../../../../commonComponents/EventFeed/EventFeed'
import SearchService from '../../../../services/search'
import { FaCalendarAlt } from 'react-icons/fa'

const FeaturedFeed = (props) => {
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        setLoading(true)
        const results = await SearchService.getAll('a', 10)
        setLoading(false)

        if (results.events) {
            setEvents(results.events)
        }
    }

    return (
        <div className="featured-feed">
            <div className="featured-feed-container">
                <div className="featured-feed-title">
                <div className="featured-feed-icon">
                    <FaCalendarAlt />
                </div>
                    Featured events for you
                </div>
                <EventFeed
                    events={events}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default withRouter(FeaturedFeed)