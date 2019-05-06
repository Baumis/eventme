import React from 'react'
import '../ComponentEditor.css'
import SettingsInput from '../ContentBlocks/SettingsInput'
import SettingsTextArea from '../ContentBlocks/SettingsTextArea'


const TextOptions = () => {

    return (
        <div className="DataSettings">
            <div className="headerRow">
                <h4>Text</h4>
            </div>
            <SettingsInput header={'title'} />
            <SettingsTextArea rows={6} header={'content'} />
            <div className="ButtonRow">
                <button>Save</button>
            </div>
        </div>
    )
}

export default TextOptions