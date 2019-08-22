import React from 'react'
import './OptionsButton.css'
import { FaPen } from 'react-icons/fa'

const OptionsButton = (props) => {

    return (
        <div className="OptionsPanelButton" onClick={props.showPanel}>
            <FaPen  />
        </div>
    )
}

export default OptionsButton