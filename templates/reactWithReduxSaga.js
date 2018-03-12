import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

const preloadedState = { application: '$name' };
const store = configureStore(preloadedState);

// Render application to DOM
ReactDOM.render(
  <Provider store={store}>
    <h1>$name</h1>
  </Provider>,
  document.getElementById('root')
);
