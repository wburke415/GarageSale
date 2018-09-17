import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';
import { RECEIVE_USER } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {

    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [Object.keys(action.payload.users)[0]]: Object.values(action.payload.users)[0] });

    case RECEIVE_PRODUCT: 
      return merge({}, state, action.sellers);

    case RECEIVE_PRODUCTS: 
      if (action.sellers) return merge({}, state, action.sellers);
      return state;

    default:
      return state;
  }
};

export default usersReducer;
