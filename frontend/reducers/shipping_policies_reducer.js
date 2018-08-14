import merge from 'lodash/merge';

import { RECEIVE_PRODUCT, RECEIVE_PRODUCTS } from '../actions/product_actions';

const shippingPoliciesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, action.shippingPolicies );
        case RECEIVE_PRODUCTS:
            return action.shippingPolicies;

        default:
            return state;
    }
};

export default shippingPoliciesReducer;