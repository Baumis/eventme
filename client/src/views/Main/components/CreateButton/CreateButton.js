import React from 'react'
import './CreateButton.css'

const CreateButton = (props) => {

    return (
        <div onClick={props.click} className="CreateButton">Create event</div>
    )
}

export default CreateButton