import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import { AuthRoute } from '../utils/route_util';
import SigninFormContainer from './session_form/signin_form_container';
import SignupFormContainer from './session_form/signup_form_container';

const App = () => (
  <div>
    <AuthRoute exact path="/login" component={SigninFormContainer} />
    <AuthRoute exact path="/register" component={SignupFormContainer} />
  </div>
);

export default App;
