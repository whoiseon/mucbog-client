import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

interface PostRequestParams {
  title: string;
  description: string;
  body: string;
  tags: string[];
  thumbnail?: string;
}

export const getPosts = async () => {
  const response = await axios.get('/api/posts');
  return response.data;
};
