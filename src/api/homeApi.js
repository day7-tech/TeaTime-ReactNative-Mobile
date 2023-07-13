import {useDispatch} from 'react-redux';
import API from './api';

export const getMomentPostsByChannel = async (channelId, numberOfItems) => {
  try {
    const response = await API.get(`/channel/${channelId}/posts`, {
      params: {
        numberOfItems,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFavPosts = async (numberOfItems, page) => {
  try {
    const response = await API.get(`/feed`, {
      params: {
        numberOfItems,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPostById = async postId => {
  try {
    const endpoint = `/post/${postId}`;
    const response = await API.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCommentsByPostId = async (postId, numberOfItems) => {
  try {
    const endpoint = `/post/${postId}/comments`;
    const response = await API.get(endpoint, {
      params: {
        numberOfItems,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createComment = async (postId, message) => {
  try {
    const endpoint = `/post/${postId}/comment`;
    const response = await API.post(endpoint, {message});

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const likePost = async postId => {
  try {
    const endpoint = `/post/${postId}/like`;
    const response = await API.post(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const unlikePost = async postId => {
  try {
    const endpoint = `/post/${postId}/like`;
    const response = await API.delete(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
