import React, { useState } from 'react';
import { MDBTabsPane, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { login } from '../../api/auth-service';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

function LoginTab({ justifyActive }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { handleSubmit } = useForm();
  const formSubmitHandler = () => {
    console.log(username, password);
    login({
      username: username,
      password: password,
    }).then(() => {
      navigate('/home');
    });
  };
  return (
    <MDBTabsPane show={justifyActive === 'tab1'}>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="text-center mb-3">
          <p>Sign in with:</p>

          <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}>
            <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn tag="a" color="none" className="m-1" style={{ color: '#1266f1' }}>
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>

          <p className="text-center mt-3">or:</p>
        </div>

        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4 w-100" type="submit">
          Sign in
        </MDBBtn>
        <p className="text-center">
          Not a member? <a href="#!">Register</a>
        </p>
      </form>
    </MDBTabsPane>
  );
}

export default LoginTab;
