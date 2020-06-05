import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import { propTypes } from 'mobx-react'

const SearchBar = (props) => {
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [])

    const handleKey = (event) => {
        if (event.keyCode === 13) {
            props.search(inputValue)
        }
    }

    return (
        <div className="search-searchbar">
            <div className="search-serachbar-title">
                Search events and profiles.
            </div>
            <div className="search-input-row">
                <input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder={"search"}
                />
                <div className="searchbar-button" onClick={() => props.search(inputValue)}>
                    Search
            </div>
            </div>
        </div>
    )
}

export default SearchBar