import merge from 'lodash/merge';

import { RECEIVE_PRODUCT } from '../actions/product_actions';

const shippingPoliciesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, { [action.shippingPolicy.id]: action.shippingPolicy });

        default:
            return state;
    }
};

export default shippingPoliciesReducer;