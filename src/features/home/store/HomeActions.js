import {SET_FAV_POSTS, SET_MOMENT_POSTS, UPDATE_LIKE_COUNT} from './HomeTypes';

// Action creator to set the posts in Redux state
export const setMomentPosts = posts => ({
  type: SET_MOMENT_POSTS,
  payload: posts,
});

export const setFavPosts = posts => ({
  type: SET_FAV_POSTS,
  payload: posts,
});

export const updateLikeCount = (postId, hasLikedPost) => {
  return {
    type: UPDATE_LIKE_COUNT,
    payload: {
      postId,
      hasLikedPost,
    },
  };
};
