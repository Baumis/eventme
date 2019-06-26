import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './views/main/Main'
import Event from './views/event/Event'

const App = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={Main} />
                <Route exact path="/events" component={Event} />
                <Route exact path="/events/:id" render={({ match }) => <Event eventId={match.params.id}/>} />
            </Router>
        </div>
    )
}

export default App