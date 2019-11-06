import React, { Component } from 'react'
import './CommentSection.css'
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
                {this.props.comments.map((comment,i)=> 
                    <Comment
                        key={i}
                        comment={comment}
                        isAuthor={this.props.isAuthor}
                    />
                )}
                <div className="comment-section-input">
                    <CommentInput 
                        messageId={this.props.messageId}
                    />
                </div>
            </div>
        )
    }
}

export default CommentSection