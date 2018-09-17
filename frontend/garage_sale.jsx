import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store';
import Root from './components/root';

// Functions imported for testing purposes only ----------------------
import { login, logout, createUser } from './actions/session_actions';
// -------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;

  if (window.currentUser) {
    const preloadedState = {
      entities: { 
        users: { [Object.keys(window.currentUser.users)[0]]: Object.values(window.currentUser.users)[0] }
      },
      session: { id: Object.keys(window.currentUser.users)[0] }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  }
  else {
    store = configureStore();
  }

  ReactDOM.render(<Root store={store} />, root);
});
