import React, { Component } from 'react'
import './MainSearchBar.css'


class MainSearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: 'search'
        }
    }

    changeValue = (event) => {
        this.setState({ inputValue: event.target.value })
    }

    render() {
        return (
            <div className="searchBarContainer">
                <input value={this.state.inputValue} onChange={this.changeValue}></input>
            </div>
        )
    }
}

export default MainSearchBar