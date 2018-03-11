import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const devToolsExtension =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

// Create store with preloaded state
const preloadedState = { application: '$name' };
const store = createStore(rootReducer, preloadedState, devToolsExtension);

// Render application to DOM
ReactDOM.render(
  <Provider store={store}>
    <h1>$name</h1>
  </Provider>,
  document.getElementById('root')
);
