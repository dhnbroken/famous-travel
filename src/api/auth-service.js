import axios from 'axios';
import { removeUserSession, setUserSession } from 'src/utils/Common/Common';

export const login = async ({ username, password }) => {
  return await axios
    .post('http://localhost:4000/login', {
      username,
      password,
    })
    .then((res) => {
      setUserSession(res.data.token, res.data.user);
      return res;
    });
};

export const logout = async () => {
  removeUserSession();
};

export const signup = async ({ username, password }) => {
  try {
    const res = await axios.post('http://localhost:4000/register', { username, password });
    return res;
  } catch (err) {
    console.log(err);
  }
};
