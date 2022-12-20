import { axiosInstance } from './axios';
import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
export const updateUserInfo = (id, formData) => API.put(`/user/${id}`, formData);

export const getAllUser = async () => {
  try {
    const res = await axiosInstance.get('/user');
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};

export const getCurrentUser = async (id) => {
  try {
    const res = await axiosInstance.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};
