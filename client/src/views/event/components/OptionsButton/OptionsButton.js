import React from 'react'
import './OptionsButton.css'
import { FaBars } from 'react-icons/fa'

const OptionsButton = (props) => {

    return (
        <div className="OptionsPanelButton" onClick={props.showPanel}>
            <FaBars />
        </div>
    )
}

export default OptionsButton