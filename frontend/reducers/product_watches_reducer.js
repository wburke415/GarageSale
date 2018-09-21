import merge from "lodash/merge";

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from "../actions/product_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const productWatchesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      if (action.productWatches) return merge({}, state, action.productWatches);
      return state;
    case RECEIVE_PRODUCT:
      if (action.productWatches) return merge({}, state, action.productWatches);
      return state;
    case RECEIVE_PRODUCTS:
      if (action.productWatches) return merge({}, state, action.productWatches);
      return state;

    default:
      return state;
  }
};

export default productWatchesReducer;
