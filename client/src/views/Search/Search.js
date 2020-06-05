import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Search.css'
import Navbar from '../../commonComponents/Navbar/Navbar'
import Footer from '../../commonComponents/Footer/Footer'
import Alert from '../../commonComponents/Alert/Alert'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            results: { events: [], users: [] },
            searching: true
        }
    }

    search = (parameter) => {
        //make apicall
    }

    render() {

        return (
            <div className="search">
                <Navbar
                    staticColor={true}
                />
                <SearchBar
                    search={this.search}
                />
                <SearchResults
                    results={this.state.results}
                    searching={this.state.searching}
                />
                <Footer />
                {this.props.VisibilityStore.alert ?
                    <Alert />
                    : null}
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Search))