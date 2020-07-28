import React, { Component } from 'react'
import './SearchBar.css'
import { FaSearch, FaAngleDown, FaChevronUp, FaAngleUp, FaFilter } from 'react-icons/fa'
import Dropdown from '../../../../commonComponents/Dropdown/Dropdown'
import FilterInput from './FilterInput/FilterInput'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typeTimeout: null,
            inputValue: '',
            searchType: 'events',
            date: null,
            location: '',
            cathegory: 'all',
            displayFilters: false
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

    toggleFilters = () => {
        this.setState({ displayFilters: !this.state.displayFilters })
    }

    search = () => {
        if (this.state.inputValue.length > 0) {
            this.props.search(this.state.inputValue)
        }
    }

    tabClassByState = (tab) => {
        return this.state.searchType === tab ?
            'searchbar-tab searchbar-selected-tab'
            : 'searchbar-tab'
    }

    render() {
        return (
            <div className="searchbar">
                <div className="searchbar-content">
                    <div className="serachbar-title">
                        Search events and profiles.
                    </div>
                    <div className="searchbar-container">
                        <div className="searchbar-tabs">
                            <div className={`${this.tabClassByState('events')} searchbar-tab-left`} onClick={() => this.changeType('events')}>
                                Events
                        </div>
                            <div className={`${this.tabClassByState('profiles')} searchbar-tab-right`} onClick={() => this.changeType('profiles')}>
                                Profiles
                            </div>
                        </div>
                        <div className="search-input-row">
                            <div className="search-input">
                                <div className="search-serachbar-icon"><FaSearch /></div>
                                <input
                                    value={this.state.inputValue}
                                    onChange={(event) => this.changeInputValue(event.target.value)}
                                    placeholder={`search ${this.state.searchType}`}
                                />
                            </div>
                            {this.state.searchType === 'events' &&
                                <div className={`searchbar-filter-button ${this.state.displayFilters ? 'filter-active': ''}`} onClick={this.toggleFilters}>
                                    <div className="filter-text"> filters </div>
                                    <FaFilter style={{color: this.state.displayFilters ? '#19a45e': ''}}/>
                                </div>
                            }
                        </div>
                        {this.state.searchType === 'events' && this.state.displayFilters &&
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
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar