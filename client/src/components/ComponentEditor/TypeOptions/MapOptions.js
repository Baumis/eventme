import React from 'react'
import '../ComponentEditor.css'
import SettingsInput from '../ContentBlocks/SettingsInput'

const MapOptions = () => {

    return (
        <div className="DataSettings">
            <div className="headerRow">
                <h4>Map</h4>
            </div>
            <SettingsInput header={'title'} />
            <SettingsInput header={'longitude'} />
            <SettingsInput header={'latitude'} />
            <div className="ButtonRow">
                <button>Save</button>
            </div>
        </div>
    )
}

export default MapOptions