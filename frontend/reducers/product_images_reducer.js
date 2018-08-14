import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';

const productImagesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, action.productImages);
        case RECEIVE_PRODUCTS:
            return merge({}, action.productImages);
    
        default:
            return state;
    }
};

export default productImagesReducer;