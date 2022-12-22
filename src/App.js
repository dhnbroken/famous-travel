/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useEffect } from 'react';
import { GlobalStoreContext } from './GlobalContext/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import MainRoutes from './routes/MainRoutes';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/login');
    }
  }, [localStorage.getItem('userId')]);

  return (
    <React.Fragment>
      <AuthProvider>
        <AppProvider>
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
            <AddRoomModal />
            <InviteMemberModal />
            <ToastContainer />
          </GlobalStoreContext>
        </AppProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
