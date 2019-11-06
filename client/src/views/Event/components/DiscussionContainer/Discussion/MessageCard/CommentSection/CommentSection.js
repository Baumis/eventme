import React, { Component } from 'react'
import './CommentSection.css'
import { withRouter } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import Moment from 'moment'
import Comment from './Comment/Comment'
import CommentInput from './CommentInput/CommentInput'

class CommentSection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            commentInput: ''
        }
    }

    render(){
        return(
            <div className="comment-section">
                {this.props.comments.map(comment => 
                    <Comment
                        comment={comment}
                    />
                )}
                <div className="comment-section-input">
                    <CommentInput />
                </div>
            </div>
        )
    }
}

export default CommentSection