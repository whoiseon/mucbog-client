import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

interface PostRequestParams {
  title: string;
  description: string;
  body: string;
  tags: string[];
  thumbnail: string;
  categoryId: number;
}

export const getDevPosts = async () => {
  const response = await axios.get('/api/posts/dev');
  return response.data;
};

export const getProjectPosts = async () => {
  const response = await axios.get('/api/posts/project');
  return response.data;
};

export const createPosts = async (params: PostRequestParams) => {
  const response = await axios.post('/api/posts', params);
  return response.data;
};
