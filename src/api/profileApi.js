import API from './api';

export const getUserDetails = async userId => {
  try {
    const response = await API.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
