import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import productsReducer from './products_reducer';
import productImagesReducer from './product_images_reducer';
import bidsReducer from './bids_reducer';
import shippingPoliciesReducer from './shipping_policies_reducer';
import locationsReducer from './locations_reducer';
import searchResultsReducer from './search_results_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  productImages: productImagesReducer,
  bids: bidsReducer,
  shippingPolicies: shippingPoliciesReducer,
  locations: locationsReducer,
  searchResults: searchResultsReducer
});

export default entitiesReducer;
