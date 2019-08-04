import React from 'react'
import './Header.css'

const InfoPanel = ({ data }) => {

    return (
        <div className="info-panel">
            <div className="info-panel-content">
                {data.map(info =>
                    <div className="info-panel-content-field">
                        <p>{info.text}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default InfoPanel