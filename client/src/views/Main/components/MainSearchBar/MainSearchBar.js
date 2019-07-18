import React, { Component } from 'react'
import './MainSearchBar.css'
import { FaSearch } from 'react-icons/fa'


class MainSearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: ''
        }
    }

    changeValue = (event) => {
        this.setState({ inputValue: event.target.value })
    }

    render() {
        return (
            <div className="search-bar-container">
                <input
                    value={this.state.inputValue}
                    onChange={this.changeValue}
                    placeholder={'search'}
                ></input>
                <div id="nav-bar-search-icon"><FaSearch /></div>
            </div>
        )
    }
}

export default MainSearchBar