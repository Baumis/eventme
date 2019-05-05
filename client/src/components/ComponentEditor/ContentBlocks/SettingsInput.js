import React from 'react'
import '../ComponentEditor.css'

const SettingsInput = (props) => {

    return (
        <div className="SettingInput">
            <label>{props.header}</label>
            <input></input>
        </div>
    )
}

export default SettingsInput