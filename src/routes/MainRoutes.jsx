/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './Routes';
import DefaultLayout from 'src/Layout/DefaultLayout/DefaultLayout';
import Login from 'src/pages/Login/Login';
import Home from 'src/pages/Home/Home';
import UserInfo from 'src/pages/UserInfo/UserInfo';

const getRegister = () => {
  return localStorage.getItem('isRegister');
};
const getAccessToken = () => {
  return localStorage.getItem('token');
};

const MainRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                getAccessToken() ? (
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                ) : getRegister() ? (
                  <UserInfo />
                ) : (
                  <Login />
                )
              }
            />
          );
        })}
        <Route
          path="/*"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default MainRoutes;
