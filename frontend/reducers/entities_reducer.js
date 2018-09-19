import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import productsReducer from './products_reducer';
import bidsReducer from './bids_reducer';
import shippingPoliciesReducer from './shipping_policies_reducer';
import locationsReducer from './locations_reducer';
import searchResultsReducer from './search_results_reducer';
import productWatchesReducer from './product_watches_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  bids: bidsReducer,
  shippingPolicies: shippingPoliciesReducer,
  locations: locationsReducer,
  searchResults: searchResultsReducer,
  productWatches: productWatchesReducer
});

export default entitiesReducer;
