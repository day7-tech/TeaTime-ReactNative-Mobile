import {
  COMPLETED_AUTH,
  LOGOUT,
  SET_AUTH_TOKEN,
  SET_USER_ID,
  START_LOADING,
  STOP_LOADING,
  TOKEN_EXPIRED,
} from './AuthTypes';

// Action creator to set the authentication token
export const setAuthData = (token, refreshToken, userId) => ({
  type: SET_AUTH_TOKEN,
  payload: {
    token,
    refreshToken,
    userId,
  },
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
