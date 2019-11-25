
import { configure, addParameters, addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import theme from 'layout/theme'
import { muiTheme } from 'storybook-addon-material-ui';
import '../src/index.css';
import '../src/index.css';

import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from 'store/reducers/auth';

// configure(require.context('../src/stories', true, /\.stories\.js$/), module);
 
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
addDecorator(muiTheme(theme))

const store = createStore(reducer,applyMiddleware(thunk));
const withProvider = (story) => ( <Provider store={store}> { story() } </Provider>)
addDecorator(withProvider)


const req = require.context('../src', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);