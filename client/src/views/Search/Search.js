import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './Search.css'
import Navbar from '../../commonComponents/Navbar/Navbar'
import Footer from '../../commonComponents/Footer/Footer'
import Alert from '../../commonComponents/Alert/Alert'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import SearchService from '../../services/search'
import UniversalModal from '../.././commonComponents/UniversalModal/UniversalModal'
import SignModal from '../../commonComponents/SignModal/SignModal'

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            results: { events: [], users: [] },
            searching: false
        }
    }

    search = async (parameter) => {
        console.log(parameter)
        this.setState({ searching: true })
        const results = await SearchService.getAll(parameter, 10)
        this.setState({ searching: false })

        if (results) {
            this.setState({ results: results })
        }

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
                {this.props.VisibilityStore.signModal ?
                    <UniversalModal
                        content={<SignModal />}
                    />
                    : null}
            </div>
        )
    }
}

export default inject('UserStore', 'VisibilityStore')(observer(Search))