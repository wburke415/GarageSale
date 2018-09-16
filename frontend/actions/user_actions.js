import * as APIUtil from "../utils/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";

const recieveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const fetchUser = id => dispatch => (
  APIUtil.fetchUser(id)
    .then(payload => dispatch(recieveUser(payload)))
);