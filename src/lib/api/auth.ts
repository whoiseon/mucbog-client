import axios from 'axios';
import { isServer } from '@tanstack/query-core';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

interface loginRequestParams {
  username: string;
  password: string;
}

export const getMyAccount = async () => {
  const response = await axios.get('/api/auth/me');
  return response.data;
};

export const login = async (params: loginRequestParams) => {
  const response = await axios.post('/api/auth/login', params);
  return response.data;
};
