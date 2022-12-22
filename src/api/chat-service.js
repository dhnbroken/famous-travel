import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const createChat = (data) => axios.post(baseUrl + '/chat/', data);

export const getUserChat = async (id) => {
  try {
    const res = await axios.get(baseUrl + `/chat/${id}`);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const getMessages = (id) => axios.get(baseUrl + `/message/${id}`);

export const addMessage = (data) => axios.post(baseUrl + '/message/', data);
