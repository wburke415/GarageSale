import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import SigninFormContainer from './session_form/signin_form_container';

const App = () => (
  <div>
    <h1>Welcome to GarageSale</h1>
    <SigninFormContainer />
  </div>
);

export default App;
