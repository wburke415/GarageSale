import merge from 'lodash/merge';

import {
    RECEIVE_PRODUCT,
    RECEIVE_PRODUCTS
} from '../actions/product_actions';

const productsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, action.products);

        case RECEIVE_PRODUCTS:
            if (action.products) return action.products;
            return state;

        default:
            return state;
    }
};

export default productsReducer;