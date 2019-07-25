import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './views/Main/Main'
import Event from './views/Event/Event'
import Profile from './views/Profile/Profile'


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        const loggedUserJSON = window.localStorage.getItem('loggedEventAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            await this.props.UserStore.refreshUser(user)
        }
        this.setState({ loading: false })
    }

    render() {
        if (this.state.loading) {
            return null
        }
        return (
            <div>
                <Router>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/events/:id" render={({ match }) => <Event eventId={match.params.id} />} />
                    <Route exact path="/events/:id/invite/:inviteKey" render={({ match }) =>
                        <Event eventId={match.params.id} inviteKey={match.params.inviteKey} />
                    } />
                    <Route exact path="/profile/:id" render={({ match }) => <Profile profileId={match.params.id} />} />
                </Router>
            </div>
        )
    }
}

export default inject('UserStore')(observer(App))