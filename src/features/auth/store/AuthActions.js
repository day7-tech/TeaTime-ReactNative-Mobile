import {
  SET_AUTH_TOKEN,
  LOGOUT,
  TOKEN_EXPIRED,
  COMPLETED_AUTH,
  START_LOADING,
  STOP_LOADING,
  SET_USER_ID,
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

export const setUserID = (userId, email) => ({
  type: SET_USER_ID,
  payload: {userId, email},
});

// Action creator to start loading
export const startLoading = () => ({
  type: START_LOADING,
});

// Action creator to stop loading
export const stopLoading = () => ({
  type: STOP_LOADING,
});
