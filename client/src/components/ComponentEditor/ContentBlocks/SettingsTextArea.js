import React from 'react'
import '../ComponentEditor.css'

const SettingsTextArea = (props) => {

    return (
        <div className="SettingInput">
            <label>{props.header}</label>
            <textarea rows={props.rows}></textarea>
        </div>
    )
}

export default SettingsTextArea