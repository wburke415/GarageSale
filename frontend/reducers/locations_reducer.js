import merge from 'lodash/merge';

import { RECEIVE_PRODUCT } from '../actions/product_actions';

const locationsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PRODUCT:
            return merge({}, state, { [action.location.id]: action.location });

        default:
            return state;
    }
};

export default locationsReducer;