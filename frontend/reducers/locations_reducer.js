import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const locationsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PRODUCT:
      return merge({}, state, action.locations);
    case RECEIVE_PRODUCTS:
      if (action.locations) return merge({}, state, action.locations);
      return state;
    case RECEIVE_CURRENT_USER:
      if (action.locations) return merge({}, state, action.locations);
      return state;

    default:
      return state;
  }
};

export default locationsReducer;