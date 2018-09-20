import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const shippingPoliciesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PRODUCT:
      return merge({}, state, action.shippingPolicies);
    case RECEIVE_PRODUCTS:
      if (action.shippingPolicies) return action.shippingPolicies;
      return state;
    case RECEIVE_CURRENT_USER:
      if (action.shippingPolicies) return merge({}, state, action.shippingPolicies);
      return state;
    default:
      return state;
  }
};

export default shippingPoliciesReducer;