import React, { Component } from 'react'
import './SearchBar.css'
import { FaSearch, FaAngleDown } from 'react-icons/fa'
import Dropdown from '../../../../commonComponents/Dropdown/Dropdown'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typeTimeout: null,
            inputValue: '',
            searchType: 'event'
        }
    }

    changeInputValue = (value) => {
        clearTimeout(this.state.typeTimeout)
        this.setState({
            inputValue: value,
            typeTimeout: setTimeout(this.search, 800)
        })
    }

    changeType = (value) => {
        this.setState({ searchType: value })
    }

    search = () => {
        if (this.state.inputValue.length > 0) {
            this.props.search(this.state.inputValue)
        }
    }

    render() {
        return (
            <div className="searchbar">
                <div className="searchbar-container">
                    <div className="serachbar-title">
                        Search events and profiles.
            </div>
                    <div className="search-input-row">
                        <div className="search-input">
                            <div className="search-serachbar-icon"><FaSearch /></div>
                            <input
                                value={this.state.inputValue}
                                onChange={(event) => this.changeInputValue(event.target.value)}
                                placeholder={"Search"}
                            />
                        </div>
                        <Dropdown
                            value={this.state.searchType}
                            items={['events', 'profiles']}
                            setValue={this.changeType}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar