import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './views/Main/Main'
import Event from './views/Event/Event'
import Profile from './views/Profile/Profile'
import NotFound from './views/NotFound/NotFound'


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
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/events/:id" render={({ match }) => <Event eventId={match.params.id} />} />
                        <Route exact path="/events/:id/invite/:inviteKey" render={({ match }) =>
                            <Event eventId={match.params.id} inviteKey={match.params.inviteKey} />
                        } />
                        <Route exact path="/profile/:id" render={({ match }) => <Profile profileId={match.params.id} />} />
                        <Route render={() => <NotFound title={'Page not found'} message={'The page you are looking for could not be found'} />} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default inject('UserStore')(observer(App))