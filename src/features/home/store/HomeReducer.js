import {getMediaTypeFromUrl} from '../../../utils/helpers';
import {
  APPEND_FAV_POSTS,
  APPEND_MOMENT_POSTS,
  SET_FAV_POSTS,
  SET_MOMENT_POSTS,
  UPDATE_LIKE_COUNT,
} from './HomeTypes';

// Define the initial state for the home screen
const initialState = {
  momentPosts: [],
  favPosts: [],
};

// Reducer function for handling home screen state updates
const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOMENT_POSTS:
      const updatedPosts = action.payload.map((post, index) => {
        const mediaType = getMediaTypeFromUrl(post.resource);
        return {...post, mediaType, key: `moment_${index}`};
      });
      return {
        ...state,
        momentPosts: updatedPosts,
      };

    case APPEND_MOMENT_POSTS:
      const updatedMomentPosts = action.payload.map((post, index) => {
        const mediaType = getMediaTypeFromUrl(post.resource);
        return {
          ...post,
          mediaType,
          key: `moment_${state.momentPosts.length + index}`,
        };
      });
      return {
        ...state,
        momentPosts: [...state.momentPosts, ...updatedMomentPosts],
      };

    case SET_FAV_POSTS:
      const favouritePosts = action.payload.map((post, index) => {
        const mediaType = getMediaTypeFromUrl(post.resource);
        return {...post, mediaType, key: `fav_${index}`};
      });
      return {
        ...state,
        favPosts: favouritePosts,
      };
    case APPEND_FAV_POSTS:
      const updatedFavPosts = action.payload.map((post, index) => {
        const mediaType = getMediaTypeFromUrl(post.resource);
        return {
          ...post,
          mediaType,
          key: `fav_${state.favPosts.length + index}`,
        };
      });
      return {
        ...state,
        favPosts: [...state.favPosts, ...updatedFavPosts],
      };

    case UPDATE_LIKE_COUNT:
      const {postId, hasLikedPost} = action.payload;
      // Find the post with the matching postId
      const favPosts = state.favPosts.map(post => {
        if (post.id === postId) {
          const updatedLikesCount = hasLikedPost
            ? post._count.likes + 1
            : post._count.likes - 1;
          return {
            ...post,
            _count: {
              ...post._count,
              likes: updatedLikesCount,
            },
            hasLikedPost,
          };
        }
        return post;
      });
      console.log(favPosts);
      return {
        ...state,
        favPosts: favPosts,
      };
    default:
      return state;
  }
};
export default homeReducer;
