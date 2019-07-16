import React from 'react'
import './CreateButton.css'

const CreateButton = (props) => {

    return (
        <div onClick={props.click} className="createButton">Create event</div>
    )
}

export default CreateButton