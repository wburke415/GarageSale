import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const productImagesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PRODUCT:
      return merge({}, state, action.productImages);
    case RECEIVE_PRODUCTS:
      if (action.productImages) return merge({}, action.productImages);
      return state;
    case RECEIVE_CURRENT_USER:
      if (action.productImages) return merge({}, action.productImages);
      return state;

    default:
      return state;
  }
};

export default productImagesReducer;