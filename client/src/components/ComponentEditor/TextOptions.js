import React from 'react'
import './ComponentEditor.css'

const TextOptions = () => {

    return (
        <div className="DataSettings">
            <div className="headerRow">
                <h4>Text</h4>
            </div>
            <div className="SettingInput">
                <label>Header</label>
                <input></input>
            </div>
            <div className="SettingInput">
                <label>Content</label>
                <textarea rows="6"></textarea>
            </div>
        </div>
    )
}

export default TextOptions