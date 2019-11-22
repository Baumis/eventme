import React from 'react'
import './MainHeader.css'
import CreateButton from '../CreateButton/CreateButton'

const MainHeader = (props) => {
    return(
        <div className="main-header">
            <div className="main-header-content">
                <div className="main-header-title">
                    Let's create your event!
                </div>
                <CreateButton click={props.createEvent} />
            </div>
        </div>
    )
}

export default MainHeader