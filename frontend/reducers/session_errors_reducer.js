import merge from 'lodash/merge';

import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  REMOVE_SESSION_ERRORS
} from '../actions/session_actions';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    
    case REMOVE_SESSION_ERRORS:
      return {};

    case RECEIVE_CURRENT_USER:
      return [];

    default:
      return state;
  }
};

export default sessionErrorsReducer;
