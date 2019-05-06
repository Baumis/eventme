import React from 'react'
import '../ComponentEditor.css'

const MapOptions = () => {

    return (
        <div className="DataSettings">
            <div className="headerRow">
                <h4>Map</h4>
            </div>
            <div className="SettingInput">
                <label>title</label>
                <input ></input>
            </div>
            <div className="SettingInput">
                <label>longitude</label>
                <input ></input>
            </div>
            <div className="SettingInput">
                <label>latitude</label>
                <input ></input>
            </div>
        </div>
    )
}

export default MapOptions