import React, { useState } from 'react';
import { MDBTabsPane, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { signup } from '../../api/auth-service';

function SignUp({ justifyActive }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { handleSubmit } = useForm();
  const formSubmitHandler = () => {
    console.log(username, password, email);
    signup({
      username,
      password,
    });
  };

  return (
    <MDBTabsPane show={justifyActive === 'tab2'}>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="text-center mb-3">
          <p>Sign up with:</p>

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

        <MDBInput wrapperClass="mb-4" label="Username" type="text" onChange={(e) => setUsername(e.target.value)} />
        <MDBInput wrapperClass="mb-4" label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
        <MDBInput wrapperClass="mb-4" label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <div className="d-flex justify-content-center mb-4">
          <MDBCheckbox name="flexCheck" label="I have read and agree to the terms" />
        </div>

        <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
      </form>
    </MDBTabsPane>
  );
}

export default SignUp;
