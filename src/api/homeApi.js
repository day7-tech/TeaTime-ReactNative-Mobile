import {useDispatch} from 'react-redux';
import API from './api';

export const getMomentPostsByChannel = async (
  channelId,
  numberOfItems,
  cursor,
) => {
  try {
    const response = await API.get(`/channel/${channelId}/posts`, {
      params: {
        numberOfItems,
        cursor,
      },
    });
    console.log('response moments', response.data);
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
    console.log('response fav', response.data);
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

export const likePost = async postId => {
  try {
    const endpoint = `/post/${postId}/like`;
    const response = await API.post(endpoint);
    console.log('postId=like=>', postId, response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const unlikePost = async postId => {
  try {
    const endpoint = `/post/${postId}/like`;
    const response = await API.delete(endpoint);
    console.log('postId==unlike>', postId, response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchCommentsByPostId = async (postId, cursor, numberOfItems) => {
  try {
    const response = await API.get(`/post/${postId}/comments`, {
      params: {
        cursor,
        numberOfItems,
      },
    });

    // Extract the comments and cursor from the response

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch comments');
  }
};

export const createComment = async (postId, message) => {
  try {
    const response = await API.post(`/post/${postId}/comment`, {
      message,
    });
    return response.data; // Assuming the response data contains the created comment
  } catch (error) {
    throw new Error('Failed to create comment'); // Handle the error as needed
  }
};
