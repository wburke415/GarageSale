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
      if (action.products) return merge({}, state, action.products);
      return state;
    case RECEIVE_PRODUCTS:
      if (action.products) return merge({}, state, action.products);
      return state;
    case RECEIVE_CURRENT_USER:
      if (action.products) return merge({}, state, action.products);
      return state;
    case CLEAR_PRODUCTS:
      return {};

    default:
      return state;
  }
};

export default productsReducer;