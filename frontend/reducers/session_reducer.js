import merge from 'lodash/merge';

import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from '../actions/session_actions';

const _nullUser = Object.freeze({
  id: null
});

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: Object.keys(action.user)[0]};

    case LOGOUT_CURRENT_USER:
      return _nullUser;

    default:
      return state;
  }
};

export default sessionReducer;
