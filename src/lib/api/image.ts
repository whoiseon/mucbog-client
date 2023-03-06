import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export const uploadImage = async (formData: FormData) => {
  const response = await axios.post('/api/uploads/thumbnail', formData, {
    headers: { 'Content-Type': 'multipart/form-data; charset=utf-8' },
  });
  return response.data;
};
