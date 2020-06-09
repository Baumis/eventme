import React, { Component } from 'react'
import './SearchBar.css'
import { FaSearch } from 'react-icons/fa'
import { renderReporter } from 'mobx-react'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typeTimeout: null,
            inputValue: ''
        }
    }

    changeInputValue = (event) => {
        clearTimeout(this.state.typeTimeout)

        this.setState({
            inputValue: event.target.value,
            typeTimeout: setTimeout(this.search, 800)
        })
    }

    search = () => {
        if (this.state.inputValue.length > 0) {
            this.props.search(this.state.inputValue)
        }
    }
    
    render() {
        return (
            <div className="search-searchbar">
                <div className="search-serachbar-title">
                    Search events and profiles.
            </div>
                <div className="search-input-row">
                    <div className="search-input">
                        <div className="search-serachbar-icon"><FaSearch /></div>
                        <input
                            value={this.state.inputValue}
                            onChange={this.changeInputValue}
                            placeholder={"Search"}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar