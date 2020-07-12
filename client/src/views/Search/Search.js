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
import { Helmet } from 'react-helmet'

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
                <Helmet>
                    <title>Search</title>
                    <meta property="og:title" content="Search"/>
                    <meta name="description"
                        content="This is a search engine for events and profiles listed on InviteOwl."/>
                    <meta property="og:description" content="This is a search engine for events and profiles listed on InviteOwl."/>
                    <meta property="og:url" content="https://www.inviteowl.com/search"/>
                    <meta property="og:image" content="https://www.inviteowl.com/owl_382x200_green.png"/>
                </Helmet>
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