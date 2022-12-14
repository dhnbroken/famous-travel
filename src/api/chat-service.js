import { axiosInstance } from './axios';

export const getUserChat = async () => {
  try {
    const res = await axiosInstance.get('/');
  } catch (err) {
    throw new Error(err);
  }
};
