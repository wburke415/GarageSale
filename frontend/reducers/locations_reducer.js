import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const locationsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PRODUCT:
      return merge({}, state, action.locations);
    case RECEIVE_PRODUCTS:
      return action.locations;
    case RECEIVE_CURRENT_USER:
      return action.locations;

    default:
      return state;
  }
};

export default locationsReducer;