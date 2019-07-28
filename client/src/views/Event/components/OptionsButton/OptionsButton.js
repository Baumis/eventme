import React from 'react'
import './OptionsButton.css'
import { FaCog } from 'react-icons/fa'

const OptionsButton = (props) => {

    return (
        <div className="OptionsPanelButton" onClick={props.showPanel}>
            <FaCog  />
        </div>
    )
}

export default OptionsButton