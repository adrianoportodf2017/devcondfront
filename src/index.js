import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import '@coreui/coreui/dist/css/coreui.min.css'

import './polyfill';
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store'
import { icons } from './assets/icons'
React.icons = icons

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


