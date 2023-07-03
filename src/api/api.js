import axios from 'axios';
import Config from 'react-native-config';
import {store} from '../store';

const API = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 5000, // Set the timeout value as per your requirements
});

API.interceptors.request.use(
  config => {
    const {
      auth: {authToken},
    } = store.getState();

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default API;
