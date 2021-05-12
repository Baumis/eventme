import React, { Component } from 'react'
import './SearchBar.css'
import { FaSearch, FaFilter } from 'react-icons/fa'
import FilterInput from './FilterInput/FilterInput'
import moment from 'moment'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typeTimeout: null,
            inputValue: '',
            date: '',
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

    changeType = async (value) => {
        await this.props.setSearchTab(value)
        this.search()
    }

    changeDate = (date) => {
        clearTimeout(this.state.typeTimeout)
        this.setState({
            date: date,
            typeTimeout: setTimeout(this.search, 800)
        })
    }

    toggleFilters = () => {
        this.setState({ displayFilters: !this.state.displayFilters })
    }

    search = () => {
        console.log(new Date(this.state.date))
        if (this.props.searchTab === 'events') {
            this.props.searchEvents(this.state.inputValue, this.state.date, moment(this.state.date).add(1, 'days').format('YYYY-MM-DD'))
        } else {
            this.props.searchUsers(this.state.inputValue)
        }
    }

    tabClassByState = (tab) => {
        return this.props.searchTab === tab ?
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
                                    placeholder={`search ${this.props.searchTab}`}
                                />
                            </div>
                            {this.props.searchTab === 'events' &&
                                <div className={`searchbar-filter-button ${this.state.displayFilters ? 'filter-active' : ''}`} onClick={this.toggleFilters}>
                                    <div className="filter-text"> filters </div>
                                    <FaFilter style={{ color: this.state.displayFilters ? '#19a45e' : '' }} />
                                </div>
                            }
                        </div>
                        {this.props.searchTab === 'events' && this.state.displayFilters &&
                            <div className="searchbar-filter-row">
                                <FilterInput
                                    label={'Date'}
                                    type={'date'}
                                    value={this.state.date}
                                    onChange={(event) => this.changeDate(event.target.value)}
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