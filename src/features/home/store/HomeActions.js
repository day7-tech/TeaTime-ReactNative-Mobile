import {SET_POSTS} from './HomeTypes';

// Action creator to set the posts in Redux state
export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts,
});
