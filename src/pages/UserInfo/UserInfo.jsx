/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Header from 'src/components/Header/Header';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContextProvider } from 'src/GlobalContext/GlobalContext';
import { CircularProgress } from '@mui/material';

import './UserInfo.scss';
import { AuthContext } from 'src/Context/AuthProvider';

function UserInfo() {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [avatar, setAvatar] = useState(null);

  console.log(user);

  const onSubmit = (data) => {};

  const handleCancleSave = () => {};

  return (
    <React.Fragment>
      <Header />
      {!user ? (
        <div className="loading">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container-xl px-4 mt-4">
            <div className="row">
              <div className="col-xl-4">
                <div className="card mb-4 mb-xl-0">
                  <div className="card-header">Profile Picture</div>
                  <div className="card-body text-center">
                    <img
                      className="avatar"
                      src={user.photoURL || 'https://udhtu.edu.ua/wp-content/uploads/2021/12/avatar-user.jpg'}
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="card mb-4">
                  <div className="card-header">Account Details</div>
                  <div className="card-body">
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">
                          First name
                        </label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          type="text"
                          placeholder="Enter your first name"
                          {...register('firstName')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLastName">
                          Last name
                        </label>
                        <input
                          className="form-control"
                          id="inputLastName"
                          type="text"
                          placeholder="Enter your last name"
                          {...register('lastName')}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Email address
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="email"
                        defaultValue={user.email}
                        disabled
                        placeholder="Enter your email address"
                        {...register('emailAddress')}
                      />
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputPhone">
                          Phone number
                        </label>
                        <input
                          className="form-control"
                          id="inputPhone"
                          type="tel"
                          placeholder="Enter your phone number"
                          {...register('phoneNumber')}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputBirthday">
                          Birthday
                        </label>
                        <input
                          className="form-control"
                          id="inputBirthday"
                          type="date"
                          name="birthday"
                          placeholder="Enter your birthday"
                          {...register('birthDate')}
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Save changes
                    </button>
                    <button className="btn btn-danger ml-3" type="button" onClick={handleCancleSave}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </React.Fragment>
  );
}

export default UserInfo;
