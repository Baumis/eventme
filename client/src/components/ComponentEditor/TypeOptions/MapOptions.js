import React from 'react'
import '../ComponentEditor.css'
import SettingsInput from '../ContentBlocks/SettingsInput'

const MapOptions = () => {

    return (
        <div className="DataSettings">
            <div className="headerRow">
                <h4>Text</h4>
            </div>
            <SettingsInput header={'title'} />
            <SettingsInput header={'longitude'} />
            <SettingsInput header={'latitude'} />
        </div>
    )
}

export default MapOptions