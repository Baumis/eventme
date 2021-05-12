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
            events: [],
            users: [],
            searching: false,
            searchTab: 'events'
        }
    }

    componentDidMount() {
        this.searchEvents('', '', '')
    }

    setSearchTab = (searchTab) => {
        this.setState({ searchTab })
    }

    searchEvents = async (label, startDate, endDate) => {
        this.setState({ searching: true })
        const events = await SearchService.findEvents(label, startDate, endDate, 0, 10)
        this.setState({ searching: false })

        if (events) {
            this.setState({ events })
        }

    }

    searchUsers = async (name) => {
        this.setState({ searching: true })
        const users = await SearchService.findUsers(name, 0, 10)
        this.setState({ searching: false })

        if (users) {
            this.setState({ users })
        }

    }

    render() {
        return (
            <div className="search">
                <Helmet>
                    <title>Search</title>
                    <meta property="og:title" content="Search" />
                    <meta name="description"
                        content="This is a search engine for events and profiles listed on InviteOwl." />
                    <meta property="og:description" content="This is a search engine for events and profiles listed on InviteOwl." />
                    <meta property="og:url" content="https://www.inviteowl.com/search" />
                </Helmet>
                <Navbar
                    staticColor={true}
                />
                <SearchBar
                    search={this.search}
                    searchEvents={this.searchEvents}
                    searchUsers={this.searchUsers}
                    setSearchTab={this.setSearchTab}
                    searchTab={this.state.searchTab}
                />
                <SearchResults
                    events={this.state.events}
                    users={this.state.users}
                    searching={this.state.searching}
                    searchTab={this.state.searchTab}
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