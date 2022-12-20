/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React from 'react';
import { GlobalStoreContext } from './GlobalContext/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import MainRoutes from './routes/MainRoutes';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
  return (
    <React.Fragment>
      <GlobalStoreContext>
        <AuthProvider>
          <AppProvider>
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
          </AppProvider>
        </AuthProvider>
      </GlobalStoreContext>
    </React.Fragment>
  );
}

export default App;
