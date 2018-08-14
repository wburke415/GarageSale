import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';

const bidsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, action.bids);
        case RECEIVE_PRODUCTS:
            return merge({}, action.bids);
        default:
            return state;
    }
};

export default bidsReducer;