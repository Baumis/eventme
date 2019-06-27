import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'mobx-react'
import UserStore from './stores/UserStore'
import VisibilityStore from './stores/VisibilityStore'
import EventStore from './stores/EventStore'

const stores = { UserStore, VisibilityStore, EventStore }

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)
