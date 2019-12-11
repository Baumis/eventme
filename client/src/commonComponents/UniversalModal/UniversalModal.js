import React from 'react'
import './UniversalModal.css'

const UniversalModal = (props) => {
    return (
        <div className="universal-modal-bg">
            <div className="universal-modal-container">
            {props.content}
            </div>
        </div>
    )
}

export default UniversalModal