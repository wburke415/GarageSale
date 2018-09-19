import merge from "lodash/merge";

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from "../actions/product_actions";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

const productWatchesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      if (action.productWatches) return action.productWatches;
      return {};
    case RECEIVE_PRODUCT:
      if (action.productWatches) return action.productWatches;
      return {};
    case RECEIVE_PRODUCTS:
      if (action.productWatches) return action.productWatches;
      return {};

    default:
      return state;
  }
};

export default productWatchesReducer;
