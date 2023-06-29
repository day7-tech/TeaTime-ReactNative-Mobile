import {
  SET_AUTH_TOKEN,
  LOGOUT,
  TOKEN_EXPIRED,
  COMPLETED_AUTH,
} from './AuthTypes';

// Action creator to set the authentication token
export const setAuthToken = token => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

// Action creator to perform logout
export const logout = () => ({
  type: LOGOUT,
});

// Action creator to handle token expiration
export const tokenExpired = () => ({
  type: TOKEN_EXPIRED,
});

// Action creator to mark authentication as completed
export const completedAuth = () => ({
  type: COMPLETED_AUTH,
});
