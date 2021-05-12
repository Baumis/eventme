import React, { useState, useEffect } from 'react'
import './FeaturedFeed.css'
import { withRouter } from 'react-router-dom'
import EventFeed from '../../../../commonComponents/EventFeed/EventFeed'
import SearchService from '../../../../services/search'
import { FaCalendarAlt } from 'react-icons/fa'

const FeaturedFeed = () => {
    const [loading, setLoading] = useState(false)
    const [events, setEvents] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        setLoading(true)
        const results = await SearchService.findUpcomingEvents(page, 8)
        setLoading(false)

        if (results) {
            setEvents(events.concat(results))
            setPage(page + 1)
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
                {!loading &&
                    <div className="load-more-row">
                        <div className="load-more-button" onClick={fetchEvents}>
                            Load more
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default withRouter(FeaturedFeed)