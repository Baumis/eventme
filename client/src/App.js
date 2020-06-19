import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './views/Main/Main'
import Event from './views/Event/Event'
import Search from './views/Search/Search'
import Profile from './views/Profile/Profile'
import NotFound from './views/NotFound/NotFound'
import PrivacyPolicy from './views/PrivacyPolicy/PrivacyPolicy'
import NewEventForm from './views/NewEventForm/NewEventForm'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        await this.props.UserStore.refreshUser()
        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading) {
            return null
        }
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/privacy" component={PrivacyPolicy} />
                        <Route exact path="/create" component={NewEventForm} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/events/:url" render={({ match }) => <Event eventUrl={match.params.url} />} />
                        <Route exact path="/profile/:id" render={({ match }) => <Profile profileId={match.params.id} />} />
                        <Route exact path="/profile/:id/verify/:token" render={({ match }) => <Profile profileId={match.params.id} verificationToken={match.params.token} />} />
                        <Route render={() => <NotFound title={'Page not found'} message={'The page you are looking for could not be found'} />} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default inject('UserStore')(observer(App))