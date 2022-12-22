import { axiosInstance } from './axios';

export const login = async ({ username, password }) => {
  return await axiosInstance
    .post('/auth/login', {
      username,
      password,
    })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
    });
};

export const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const signup = async ({ username, password, emailAddress, firstname, lastname }) => {
  try {
    const res = await axiosInstance.post('/auth/register', {
      username,
      password,
      emailAddress,
      firstname,
      lastname,
    });
    if (res.status === 200) {
      localStorage.removeItem('isRegister');
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};
