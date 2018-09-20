import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SigninFormContainer from './session_form/signin_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import ProductShowContainer from './product/show/product_show_container';
import CreateProductFormContainer from './product/create/create_product_form_container';
import ProductIndexContainer from './product/index/product_index_container';
import SplashPageContainer from './splash_page/splash_page_container';
import MyGarageContainer from './my_garage/my_garage_container';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={SigninFormContainer} />
      <AuthRoute exact path="/register" component={SignupFormContainer} />
      <Route exact path="/products/new" />
      <Route path="/" component={NavBarContainer} />
    </Switch>

    <Switch>
      <ProtectedRoute exact path="/products/new" component={CreateProductFormContainer} />
      <Route exact path="/products/:id" component={ProductShowContainer} />
      <ProtectedRoute exact path="/mygarage" component={MyGarageContainer} />
      <Route exact path="/products" component={ProductIndexContainer} />
      <Route exact path="/" component={SplashPageContainer} />
    </Switch>
  </div>
);

export default App;
