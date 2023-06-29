import axios from 'axios';
import Config from 'react-native-config';

const API = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 5000, // Set the timeout value as per your requirements
});

export default API;
