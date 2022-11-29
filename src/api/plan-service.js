import axios from 'axios';
import { axiosInstance } from './axios';

export const savePlace = async (data) => {
  try {
    const res = await axiosInstance.post('/coords', data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPlace = async () => {
  try {
    const res = await axios.get('http://localhost:4000/coords');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const removePlace = async () => {
//     try {
//         const res = await axios.delete('http://localhost:4000/coords');

//     }
// };

export const removePlace = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:4000/coords/${id}`);
    return res;
  } catch (error) {
    throw Error(String(error));
  }
};
