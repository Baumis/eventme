import React, { useState } from 'react'
import './SearchBar.css'

const SearchBar = (props) => {
    const [inputValue, setInputValue] = useState('')
    const [typeTimeout, setTypeTimeout] = useState(null)

    const changeInputValue = (event) => {
        clearTimeout(typeTimeout)

        setInputValue(event.target.value)
        setTypeTimeout(setTimeout(search, 500))
    }

    const search = () => {
        if (inputValue.length > 0) {
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
                    onChange={changeInputValue}
                    placeholder={"Search"}
                />
            </div>
        </div>
    )
}

export default SearchBar