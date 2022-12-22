import axios from 'axios';
import { axiosInstance } from './axios';

export const savePlace = async (data) => {
  try {
    const currentId = localStorage.getItem('userId');
    const res = await axiosInstance.post('/location/save', { userId: currentId, ...data });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get all place by user Id
export const getPlace = async () => {
  try {
    const currentId = localStorage.getItem('userId');
    const res = await axios.get(`http://localhost:5000/location/${currentId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const removePlace = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:5000/location/${id}`);
    return res;
  } catch (error) {
    throw Error(String(error));
  }
};
