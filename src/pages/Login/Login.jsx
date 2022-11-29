/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LoginTab from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent } from 'mdb-react-ui-kit';

import './Login.scss';

// const schema = yup
//   .object({
//     emailAddress: yup.string().max(20).required(),
//     password: yup.string().min(6).max(20).required(),
//   })
//   .required();

const Login = () => {
  const navigate = useNavigate();

  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/home');
    }
  }, [sessionStorage.getItem('token')]);
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
