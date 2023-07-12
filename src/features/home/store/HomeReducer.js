import {getMediaTypeFromUrl} from '../../../utils/helpers';
import {SET_POSTS} from './HomeTypes';

// Define the initial state for the home screen
const initialState = {
  posts: [],
};

// Reducer function for handling home screen state updates
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      const updatedPosts = action.payload.map(post => {
        const mediaType = getMediaTypeFromUrl(post.resource);
        return {...post, mediaType};
      });
      return {
        ...state,
        posts: updatedPosts,
      };
    default:
      return state;
  }
};
export default homeReducer;
