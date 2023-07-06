import API from './api';
export const signUp = async (password, name, dob, userId) => {
  try {
    const response = await API.post('/user/signup', {
      password,
      name,
      dob,
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await API.post('/user/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await API.post('/user/login', {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendVerificationEmail = async email => {
  try {
    const response = await API.post('/user/send-verification-email', {
      email,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyCode = async (code, userId) => {
  try {
    const response = await API.post('/user/verify', {
      code,
      userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
