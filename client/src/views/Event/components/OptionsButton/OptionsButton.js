import React from 'react'
import './OptionsButton.css'
import { FaToolbox } from 'react-icons/fa'

const OptionsButton = (props) => {

    return (
        <div className="OptionsPanelButton" onClick={props.showPanel}>
            <FaToolbox />
        </div>
    )
}

export default OptionsButton