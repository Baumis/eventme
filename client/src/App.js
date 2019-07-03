import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './views/main/Main'
import Event from './views/event/Event'
import Profile from './views/profile/Profile'

const App = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={Main} />
                <Route exact path="/events/:id" render={({ match }) => <Event eventId={match.params.id}/>} />
                <Route exact path="/profile" component={Profile} />
            </Router>
        </div>
    )
}

export default App