import React from 'react'
import './ComponentEditor.css'
import TextOptions from './TextOptions'
import { FaLocationArrow, FaPen, FaTimes } from 'react-icons/fa'

const ComponentEditor = (props) => {

    return (
        <div className="ModalBackground">
            <div className="EditorContainer">
                <div className="TypeRow">
                    <div className="TypeItem">
                        <FaPen />
                        <label>Text</label>
                    </div>
                    <div className="TypeItem">
                        <FaLocationArrow />
                        <label>Map</label>
                    </div>
                </div>
                <div className="SettingsContent">
                    <div className="exitRow" onClick={props.close}><FaTimes /></div>
                    <TextOptions />
                    <div className="ButtonRow">
                        <button>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentEditor