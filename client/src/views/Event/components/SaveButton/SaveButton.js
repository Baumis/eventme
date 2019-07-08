import React from 'react'
import './SaveButton.css'
import { FaSave } from 'react-icons/fa'

const SaveButton = (props) => {
    let bottomCSS = '-47px'
    if (!props.saved) {
        bottomCSS = '30px'
    }

    return (
        <div style={{ bottom: bottomCSS }} className="SaveButton" onClick={props.save}>
            <p>Save</p>
            <FaSave />
        </div>
    )
}

export default SaveButton