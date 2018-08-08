import merge from 'lodash/merge';

import { RECEIVE_PRODUCT } from '../actions/product_actions';

const productImagesReducer = (state = {}, action) => {
    // debugger;
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, action.productImages);
    
        default:
            return state;
    }
};

export default productImagesReducer;