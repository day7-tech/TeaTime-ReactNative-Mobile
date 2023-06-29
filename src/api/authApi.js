import API from './api';
export const signUp = async (email, password, username) => {
  try {
    const response = await API.post('/user/signup', {
      email,
      password,
      username,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
