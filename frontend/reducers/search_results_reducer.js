import merge from "lodash/merge";

import {
  RECEIVE_PRODUCT_TITLES,
} from "../actions/product_actions";

const searchBarReducer = (state = {}, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_PRODUCT_TITLES:
      return action.titles;

    default:
      return state;
  }
};

export default searchBarReducer;
