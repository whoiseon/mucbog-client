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

export const getDevRecentPosts = async (page: number) => {
  const response = await axios.get(`/api/posts/dev/recent?page=${page || 1}`);
  return response.data;
};

export const getProjectRecentPosts = async (page: number) => {
  const response = await axios.get(
    `/api/posts/project/recent?=page${page || 1}`,
  );
  return response.data;
};

export const getAllPosts = async () => {
  const response = await axios.get('/api/posts');
  return response.data;
};

export const getPostsByTag = async (tagName: string) => {
  const response = await axios.get(`/api/posts/tag/${tagName}`);
  return response.data;
};

export const getPostByTitle = async (title: string) => {
  const response = await axios.get(`/api/posts/${title}`);
  return response.data;
};

export const createPosts = async (params: PostRequestParams) => {
  const response = await axios.post('/api/posts', params);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await axios.delete(`/api/posts/${id}`);
  return response.data;
};
