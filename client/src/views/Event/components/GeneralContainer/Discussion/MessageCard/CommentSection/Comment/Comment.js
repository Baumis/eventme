import React from 'react'
import './Comment.css'
import Moment from 'moment'
import { withRouter } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import AvatarPic from '../../../../../../../../assets/avatar.png'

const Comment = (props) => {

    const getAvatar = () => {
        if (!props.comment.author.avatar) {
            return { backgroundImage: `url(${AvatarPic})` }
        }
        return { backgroundImage: `url(${props.comment.author.avatar})` }
    }

    const toProfile = (id) => {
        props.history.push(`/profile/${id}`)
    }

    return (
        <div className="comment">
            {!props.comment.author ?
                <div className="comment-wrapper comment-deleted">
                    Comment deleted
                </div>
                :
                <div className="comment-wrapper">
                    <div className="comment-avatar-section">
                        <div style={getAvatar()} className="comment-avatar"> </div>
                    </div>
                    <div className="comment-info-section">
                        <div className="comment-header">
                            <div className="comment-time-author">
                                <div className="comment-author" onClick={() => toProfile(props.comment.author._id)}>
                                    {props.comment.author.name}
                                </div>
                                <div className="comment-time">
                                    {Moment(props.comment.time).format('D.MM.YY')}
                                </div>
                            </div>
                            {props.isAuthor(props.comment.author._id) ?
                                <div className="comment-delete" onClick={() => props.deleteComment(props.comment._id)}>
                                    <FaTimes />
                                </div>
                                : null}
                        </div>
                        <div className="comment-content">
                            {props.comment.content}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default withRouter(Comment)