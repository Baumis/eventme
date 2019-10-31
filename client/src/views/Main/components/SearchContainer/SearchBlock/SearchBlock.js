import React from 'react'
import './SearchBlock.css'
import { FaSearch } from 'react-icons/fa'

const SearchBlock = () => {
    return (
        <div className="search-block">
            <div className="search-block-title">
                Search events and people.
            </div>
            <div className="search-block-input">
                <input />
                <div className="search-block-button">
                    <FaSearch />
                </div>
            </div>
        </div>
    )
}

export default SearchBlock