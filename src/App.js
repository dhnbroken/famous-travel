/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useEffect } from 'react';
import MainRoutes from './routes/MainRoutes';
import { useNavigate } from 'react-router-dom';
import { GlobalStoreContext } from './Context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [localStorage.getItem('token')]);
  return (
    <React.Fragment>
      <GlobalStoreContext>
        <MainRoutes />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </GlobalStoreContext>
    </React.Fragment>
  );
}

export default App;
