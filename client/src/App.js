import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './views/main/Main'
import Event from './views/event/Event'

class App extends Component {

    componentDidMount() {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.props.UserStore.setCurrentUser(user)
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/events/:id" render={({ match }) => <Event eventId={match.params.id} />} />
                </Router>
            </div>
        )
    }
}

export default inject('UserStore')(observer(App))