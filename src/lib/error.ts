import axios from 'axios';

export function extractError(error: any) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    return data;
  }

  return {
    statusCode: 500,
    message: 'UnknownError',
    error: 'Forbidden',
  };
}
