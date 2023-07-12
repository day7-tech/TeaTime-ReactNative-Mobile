import API from './api';
export const signUp = async (
  password,
  firstName,
  lastName,
  dob,
  userId,
  profilePic,
) => {
  try {
    const form = new FormData();
    form.append('password', password);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('dob', dob);
    form.append('userId', userId);
    form.append('profilePic', profilePic);
    const response = await API.post('/user/signup', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
    console.log(response.data, email);
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
