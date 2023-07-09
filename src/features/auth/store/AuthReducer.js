import {
  SET_USER_ID,
  SET_AUTH_TOKEN,
  LOGOUT,
  TOKEN_EXPIRED,
  COMPLETED_AUTH,
  START_LOADING,
  STOP_LOADING,
  SET_REFRESH_TOKEN,
} from './AuthTypes';

const initialState = {
  authToken: null,
  refreshToken: null, // New addition: refresh token state
  userId: null,
  email: null,
  isAuthenticated: false,
  isAuthCompleted: false,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload.refreshToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
        isAuthenticated: true,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload.userId,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        ...state,
        authToken: null,
        refreshToken: null, // Reset the refresh token as well
        userId: null,
        email: null,
        isAuthenticated: false,
      };
    case TOKEN_EXPIRED:
      return {
        ...state,
        authToken: null,
        refreshToken: null, // Reset the refresh token as well
        userId: null,
        email: null,
        isAuthenticated: false,
      };
    case COMPLETED_AUTH:
      return {
        ...state,
        isAuthCompleted: true,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
