import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import productsReducer from './products_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  products: productsReducer
});

export default entitiesReducer;
