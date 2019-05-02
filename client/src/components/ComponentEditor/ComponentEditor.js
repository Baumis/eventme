import React from 'react'
import './ComponentEditor.css'
import TextOptions from './TextOptions'
import { FaLocationArrow, FaPen, FaTimes } from 'react-icons/fa'

const ComponentEditor = () => {

    return (
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
            <div className="Content">
                <div className="exitRow"><FaTimes /></div>
                <TextOptions />
                <div className="ButtonRow">
                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}

export default ComponentEditor