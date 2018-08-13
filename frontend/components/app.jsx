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
import NavBarContainer from './nav_bar/nav_bar_container';
import ProductShowContainer from './product/product_show_container';
import CreateProductFormContainer from './product/create_product_form_container';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={SigninFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />
      <Route path="/products/new" component={CreateProductFormContainer} />
      <Route path="/" component={NavBarContainer} />
    </Switch>
      {/* <Route exact path="/products/:id" component={ProductShowContainer} /> */}
  </div>
);

export default App;
