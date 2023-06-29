import {
  SET_AUTH_TOKEN,
  LOGOUT,
  TOKEN_EXPIRED,
  COMPLETED_AUTH,
} from './AuthTypes';

const initialState = {
  authToken: null,
  isAuthenticated: false,
  isAuthCompleted: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        authToken: null,
        isAuthenticated: false,
      };
    case TOKEN_EXPIRED:
      return {
        ...state,
        authToken: null,
        isAuthenticated: false,
      };
    case COMPLETED_AUTH:
      return {
        ...state,
        isAuthCompleted: true,
      };
    default:
      return state;
  }
};

export default authReducer;
