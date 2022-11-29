import axios from 'axios';
import { authHeader } from './auth-header';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});
