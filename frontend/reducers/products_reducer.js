import merge from 'lodash/merge';

import {
  RECEIVE_PRODUCT,
  RECEIVE_PRODUCTS,
  CLEAR_PRODUCTS
} from '../actions/product_actions';

import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const productsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PRODUCT:
      return merge({}, state, action.products);
    case RECEIVE_PRODUCTS:
      return action.products;
    case RECEIVE_CURRENT_USER:
      return action.products;
    case CLEAR_PRODUCTS:
      return {};

    default:
      return state;
  }
};

export default productsReducer;