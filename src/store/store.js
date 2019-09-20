import React, { useReducer } from 'react';
import reducer, { initialState } from './store/reducers/auth'

const Store = React.createcontext();

const createStore = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

const Provider = (children) => {
  const store = createStore(reducer, initialState);
  return <Store.Provider value={store}>{children}</Store.Provider>
};

export { Store, Provider };
