import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store';
import Root from './components/app';

// Functions imported for testing purposes only ----------------------
import { login, logout } from './actions/session_actions';
// -------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  const store = configureStore();

  // Functions put on the window for testing purposes only -----------
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.logout = logout;
  // -----------------------------------------------------------------

  ReactDOM.render(<Root store={ store } />, root);
});
