import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import theme from 'layout/theme'
import { muiTheme } from 'storybook-addon-material-ui';
import '../src/index.css';
import '../src/index.css';
import ContextProviders from '../src/context'



// configure(require.context('../src/stories', true, /\.stories\.js$/), module);
 
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
addDecorator(muiTheme(theme))

const withProvider = (story) => ( <ContextProviders > { story() } </ContextProviders>)
addDecorator(withProvider)


const req = require.context('../src', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);