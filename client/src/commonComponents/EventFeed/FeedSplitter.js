import React from 'react'
import './FeedSplitter.css'
import moment from 'moment'

const FeedSplitter = (props) => {

    return (
        <div className="feed-splitter">
            <div className="feed-splitter-line">
            </div>
            <div className="feed-splitter-date">
                {moment(props.date).isSame(new Date()) ?
                    'today'
                    :
                    moment(props.date).format('DD.MM.YYYY')
                }
            </div>
        </div>
    )
}

export default FeedSplitter