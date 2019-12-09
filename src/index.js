import React from 'react';

import ReactDOM from 'react-dom'
import App from './App'
import ContextProviders from './context'

ReactDOM.render(
  <ContextProviders>
    <App />
  </ContextProviders>,
  document.getElementById('root'),
)