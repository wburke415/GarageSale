import merge from 'lodash/merge';

import {
    RECEIVE_PRODUCT,
    RECEIVE_PRODUCTS,
    CLEAR_PRODUCTS
} from '../actions/product_actions';

const productsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, action.products);

        case RECEIVE_PRODUCTS:
            if (action.products) return action.products;
            return state;

        case CLEAR_PRODUCTS:
            return {};

        default:
            return state;
    }
};

export default productsReducer;