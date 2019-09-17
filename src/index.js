// React base
import React from 'react'
import ReactDOM from 'react-dom'
// Store
import store from './store'
import { Provider } from 'react-redux'
// Router
import { HashRouter } from 'react-router-dom'
// App
import App from './components/App'
import * as serviceWorker from './serviceWorker';

import './index.module.scss';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.querySelector('#root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
