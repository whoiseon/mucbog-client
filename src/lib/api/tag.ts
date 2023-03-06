import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const getAllTags = async () => {
  const response = await axios.get('/api/tags');
  return response.data;
};
