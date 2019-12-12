import React, { Component } from 'react'
import './UniversalModal.css'

class UniversalModal extends Component {

    componentDidMount() {
        if (this.props.open) {
            document.body.style.overflow = 'hidden';
        }
    }

    componentWillUnmount() {
        document.body.style.overflow = 'unset';
    }

    render() {
        return (
            <div className="universal-modal-bg">
                <div className="universal-modal-container">
                    {this.props.content}
                </div>
            </div>
        )
    }
}

export default UniversalModal