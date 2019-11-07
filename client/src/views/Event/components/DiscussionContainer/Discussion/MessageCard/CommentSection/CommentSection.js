import React, { Component } from 'react'
import './CommentSection.css'
import { inject, observer } from 'mobx-react'
import Comment from './Comment/Comment'
import CommentInput from './CommentInput/CommentInput'

class CommentSection extends Component {

    deleteComment = async (commentId) => {
        if (!this.props.EventStore.saved) {
            alert('Please save your event before deleting comment.')
            return
        }

        const confirmation = window.confirm('Do you want to delete this comment?')
        if (confirmation) {
            const event = await this.props.EventStore.deleteComment(this.props.messageId, commentId)
            if (!event) {
                alert('The comment could not be deleted right now.')
            }
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
                        deleteComment={this.deleteComment}
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

export default inject('EventStore', 'UserStore')(observer(CommentSection))