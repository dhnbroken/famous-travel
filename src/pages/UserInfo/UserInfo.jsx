/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Header from 'src/components/Header/Header';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signup } from 'src/api/auth-service';
import { useContext } from 'react';
import { GlobalContextProvider } from 'src/Context/GlobalContext';

import './UserInfo.scss';

function UserInfo() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { username, password, email, setUsername, setPassword, setEmail, currentUser } =
    useContext(GlobalContextProvider);
  const [avatar, setAvatar] = useState(null);

  console.log(currentUser);

  const onSubmit = (data) => {
    console.log(data, avatar);
    signup({
      username,
      password,
      emailAddress: email,
      avatarPath: avatar,
      firstname: data.firstName,
      lastname: data.lastName,
      location: data.location,
      organization: data.organization,
      phoneNumber: data.phoneNumber,
      birthDate: data.birthDate,
    }).then((data) => {
      if (data.status === 200) {
        navigate('/login');
      }
    });
  };

  const handleCancleSave = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    localStorage.removeItem('isRegister');
    navigate('/login');
  };

  return (
    <React.Fragment>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="container-xl px-4 mt-4">
          <div className="row">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                  <img
                    className="avatar"
                    src={avatar || 'https://www.bootdey.com/img/Content/avatar/avatar1.png'}
                    alt="avatar"
                  />

                  <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                  <button className="btn btn-primary" type="button">
                    <input
                      type="file"
                      onChange={(e) => {
                        setAvatar(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </button>
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
                        defaultValue={currentUser.firstname}
                        {...register('firstName')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        defaultValue={currentUser.lastname}
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Enter your last name"
                        {...register('lastName')}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputOrgName">
                        Organization name
                      </label>
                      <input
                        className="form-control"
                        id="inputOrgName"
                        type="text"
                        placeholder="Enter your organization name"
                        {...register('organization')}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Location
                      </label>
                      <input
                        className="form-control"
                        id="inputLocation"
                        type="text"
                        placeholder="Enter your location"
                        {...register('location')}
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
                      defaultValue={currentUser.emailAddress || email}
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
    </React.Fragment>
  );
}

export default UserInfo;
