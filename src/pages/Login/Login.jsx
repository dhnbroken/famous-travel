/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginTab from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent } from 'mdb-react-ui-kit';

import './Login.scss';

const Login = () => {
  const navigate = useNavigate();

  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [localStorage.getItem('token')]);
  return (
    <React.Fragment>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between">
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <LoginTab justifyActive={justifyActive} />
          <SignUp justifyActive={justifyActive} />
        </MDBTabsContent>
      </MDBContainer>
    </React.Fragment>
  );
};

export default Login;
