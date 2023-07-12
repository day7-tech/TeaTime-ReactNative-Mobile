import {SET_USER_DETAILS} from './ProfileTypes';

const initialState = {
  userDetails: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    default:
      return state;
  }
};
export default profileReducer;
