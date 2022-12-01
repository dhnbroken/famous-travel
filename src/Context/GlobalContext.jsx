import React, { useState } from 'react';
import { ProjectContext } from './ProjectContext';

export const GlobalContextProvider = React.createContext(ProjectContext);
export const GlobalStoreContext = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const valueContext = {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
  };
  return <GlobalContextProvider.Provider value={valueContext}>{children}</GlobalContextProvider.Provider>;
};
