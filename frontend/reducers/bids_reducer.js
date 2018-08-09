import merge from 'lodash/merge';

import { RECEIVE_PRODUCT } from '../actions/product_actions';

const bidsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, action.bids);

        default:
            return state;
    }
};

export default bidsReducer;