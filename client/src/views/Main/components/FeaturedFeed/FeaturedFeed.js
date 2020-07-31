import React, { useState, useEffect } from 'react'
import './FeaturedFeed.css'
import { withRouter } from 'react-router-dom'
import EventFeed from '../../../../commonComponents/EventFeed/EventFeed'
import SearchService from '../../../../services/search'
import { FaCalendarAlt } from 'react-icons/fa'
import moment from 'moment'

const FeaturedFeed = (props) => {
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        setLoading(true)
        const results = await SearchService.getAll('', 10)
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
                    Upcomming events
                </div>
                <EventFeed
                    events={events}
                    loading={loading}
                />
                <div className="load-more-row">
                    <div className="load-more-button">
                        Load more
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(FeaturedFeed)