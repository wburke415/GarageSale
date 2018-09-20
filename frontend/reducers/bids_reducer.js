import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const bidsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {

    case RECEIVE_CURRENT_USER:
      if (action.bids) return action.bids;
      return state;
    case RECEIVE_PRODUCT:
      return merge({}, state, action.bids);
    case RECEIVE_PRODUCTS:
      if (action.bids) return action.bids;
      return state;

    default:
      return state;
  }
};

export default bidsReducer;