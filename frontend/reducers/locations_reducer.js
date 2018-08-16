import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';

const locationsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, action.locations);
        case RECEIVE_PRODUCTS:
            if (action.locations) return action.locations;
            return state;

        default:
            return state;
    }
};

export default locationsReducer;