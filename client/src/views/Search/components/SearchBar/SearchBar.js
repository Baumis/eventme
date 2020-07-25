import React, { Component } from 'react'
import './SearchBar.css'
import { FaSearch, FaAngleDown } from 'react-icons/fa'
import Dropdown from '../../../../commonComponents/Dropdown/Dropdown'
import FilterInput from './FilterInput/FilterInput'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typeTimeout: null,
            inputValue: '',
            searchType: 'event',
            date: null,
            location: ''
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
                                placeholder={"Name"}
                            />
                        </div>
                        <Dropdown
                            value={this.state.searchType}
                            items={['events', 'profiles']}
                            setValue={this.changeType}
                        />
                    </div>
                    <div className="searchbar-filter-row">
                        <FilterInput 
                            label={'Date'}
                            type={'date'}
                            value={this.state.date}
                            onChange={(event) => this.setState({ date: event.target.value })}
                        />
                        <FilterInput 
                            label={'Location'}
                            type={'text'}
                            value={this.state.location}
                            onChange={(event) => this.setState({ location: event.target.value })}
                            placeholder={'city, address'}
                        />
                    </div>
                    <div className="searchbar-button-row">
                        <div className="searchbar-submit-button" onClick={this.search}>
                            Search
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar