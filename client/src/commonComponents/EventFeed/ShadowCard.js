import React from 'react'
import './ShadowCard.css'

const ShadowCard = (props) => {

    const getCardModeClass = () => {
        return props.smallCard ? "shadow-small-card" : undefined
    }

    return (
        <div className={`shadow-card  ${getCardModeClass()}`}>
            <div className="shadow-card-picture">
                
            </div>
        </div>
    )
}

export default ShadowCard