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
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  }
  else {
    store = configureStore();
  }

  // Functions put on the window for testing purposes only -----------
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.logout = logout;
  window.createUser = createUser;
  // -----------------------------------------------------------------

  ReactDOM.render(<Root store={store} />, root);
});
