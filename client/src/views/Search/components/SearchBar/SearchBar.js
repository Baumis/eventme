import React, { useState, useEffect, useRef } from 'react'
import './SearchBar.css'

const SearchBar = (props) => {
    const [inputValue, setInputValue] = useState('')

    const inputRef = useRef(inputValue);
    useEffect(() => {
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [inputValue])

    const handleKey = (event) => {
        if (event.keyCode === 13) {
            search(inputRef.current)
        }
    }

    const search = () => {
        if (inputValue.length < 1) {
            return
        }
        props.search(inputValue)
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
                    placeholder={"Search"}
                />
                <div className="searchbar-button" onClick={() => search(inputValue)}>
                    Search
            </div>
            </div>
        </div>
    )
}

export default SearchBar