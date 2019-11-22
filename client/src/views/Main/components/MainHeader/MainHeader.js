import React from 'react'
import './MainHeader.css'
import CreateButton from '../CreateButton/CreateButton'

const SearchBlock = () => {
    return(
        <div className="main-header">
            <div className="main-header-content">
                <div className="main-header-title">
                    Let's create your event!
                </div>
                <CreateButton />
            </div>
        </div>
    )
}

export default SearchBlock