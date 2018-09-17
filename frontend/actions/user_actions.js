import * as APIUtil from "../utils/user_api_util";

import {receiveCurrentUser} from './session_actions';

export const fetchUser = id => dispatch => (
  APIUtil.fetchUser(id)
    .then(payload => dispatch(receiveCurrentUser(payload)))
);