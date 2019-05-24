import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './views/Main'
import Event from './views/Event'

const App = () => {
    return (
        <div>
            <Router>
                <Route exact path="/" component={Main} />
                <Route path="/event" component={Event}/>
            </Router>
        </div>
    )
}

export default App