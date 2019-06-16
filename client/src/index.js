import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'mobx-react'
import UserStore from './stores/UserStore'
import VisibilityStore from './stores/VisibilityStore'

const stores = { UserStore, VisibilityStore }

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
)
