import { axiosInstance } from './axios';

export const getAllUser = async () => {
  try {
    const res = await axiosInstance.get('/user');
    console.log(res.data);
    return res.data.result;
  } catch (error) {
    throw Error(String(error));
  }
};

export const getCurrentUser = async () => {
  try {
    const currentId = localStorage.getItem('userId');
    const res = await axiosInstance.get(`/user/${currentId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};
