import React, { useState } from 'react';
import { getCurrentUser } from 'src/api/user-service';
import { getPlace } from 'src/api/plan-service';
import { ProjectContext } from './ProjectContext';

export const GlobalContextProvider = React.createContext(ProjectContext);
export const GlobalStoreContext = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [placeSaved, setPlaceSaved] = useState([]);

  const getPlaceSaved = async () => {
    try {
      const res = await getPlace();
      setPlaceSaved(res);
    } catch (error) {}
  };

  const getUserInfomation = async () => {
    try {
      const res = await getCurrentUser();
      setCurrentUser(res);
    } catch (error) {}
  };

  const valueContext = {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    currentUser,
    placeSaved,
    getPlaceSaved,
    getUserInfomation,
  };
  return <GlobalContextProvider.Provider value={valueContext}>{children}</GlobalContextProvider.Provider>;
};
