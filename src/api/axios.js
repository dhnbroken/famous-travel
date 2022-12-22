import axios from 'axios';
import { toast } from 'react-toastify';
import { toastMsg } from 'src/utils/Common/toast';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 15000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    response.status === 200 && toast.success('Success', toastMsg);
    return response;
  },
  (error) => {
    toast.error(error.response.data, toastMsg);
    return error;
  },
);
