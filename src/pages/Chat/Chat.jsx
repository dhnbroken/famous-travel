import React, { useState, useRef, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import './Chat.scss';
import Header from 'src/components/Header/Header';
import { io } from 'socket.io-client';

export default function Chat() {
  const socket = useRef();
  const userId = localStorage.getItem('userId');

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io('ws://localhost:8800');
    socket.current.emit('new-user-add', userId);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
      console.log(chats);
    });
  }, [userId]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on('recieve-message', (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <React.Fragment>
      <Header />
      <MDBContainer fluid className="py-5 gradient-custom">
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <h5 className="font-weight-bold mb-3 text-center text-dark">Member</h5>

            <MDBCard className="mask-custom">
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0">
                  <li
                    className="p-2 border-bottom"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,.3) !important',
                    }}
                  >
                    <a href="#!" className="d-flex justify-content-between link-light">
                      <div className="d-flex flex-row">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0 text-dark">John Doe</p>
                          <p className="small text-dark">Hello, Are you there?</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small mb-1 text-dark">Just now</p>
                        <span className="badge bg-danger float-end">1</span>
                      </div>
                    </a>
                  </li>
                  <li className="p-2 border-bottom">
                    <a href="#!" className="d-flex justify-content-between link-light">
                      <div className="d-flex flex-row">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0 text-dark">Danny Smith</p>
                          <p className="small text-dark">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-dark mb-1">5 mins ago</p>
                      </div>
                    </a>
                  </li>
                  <li className="p-2 border-bottom">
                    <a href="#!" className="d-flex justify-content-between link-light">
                      <div className="d-flex flex-row">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0 text-dark">Alex Steward</p>
                          <p className="small text-dark">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-dark mb-1">Yesterday</p>
                      </div>
                    </a>
                  </li>
                  <li className="p-2 border-bottom">
                    <a href="#!" className="d-flex justify-content-between link-light">
                      <div className="d-flex flex-row">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0 text-dark">Ashley Olsen</p>
                          <p className="small text-dark">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-dark mb-1">Yesterday</p>
                      </div>
                    </a>
                  </li>
                  <li className="p-2 border-bottom">
                    <a href="#!" className="d-flex justify-content-between link-light">
                      <div className="d-flex flex-row">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0 text-dark">Kate Moss</p>
                          <p className="small text-dark">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-dark mb-1">Yesterday</p>
                      </div>
                    </a>
                  </li>
                  <li className="p-2 border-bottom">
                    <a href="#!" className="d-flex justify-content-between link-light">
                      <div className="d-flex flex-row">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0 text-dark">Lara Croft</p>
                          <p className="small text-dark">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-dark mb-1">Yesterday</p>
                      </div>
                    </a>
                  </li>
                  <li className="p-2">
                    <a href="#!" className="d-flex justify-content-between link-light">
                      <div className="d-flex flex-row">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                          alt="avatar"
                          className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                          width="60"
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0 text-dark">Brad Pitt</p>
                          <p className="small text-dark">Lorem ipsum dolor sit.</p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small text-dark mb-1">5 mins ago</p>
                        <span className="text-dark float-end">
                          <MDBIcon fas icon="check" />
                        </span>
                      </div>
                    </a>
                  </li>
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled className="text-dark">
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,.3)' }}
                  >
                    <p className="fw-bold mb-0 text-dark">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 12 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="d-flex justify-content-between mb-4">
                <MDBCard className="w-100 mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,.3)' }}
                  >
                    <p className="fw-bold mb-0 text-dark">Lara Croft</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 13 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                    </p>
                  </MDBCardBody>
                </MDBCard>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                  width="60"
                />
              </li>
              <li className="d-flex justify-content-between mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                  alt="avatar"
                  className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                  width="60"
                />
                <MDBCard className="mask-custom">
                  <MDBCardHeader
                    className="d-flex justify-content-between p-3"
                    style={{ borderBottom: '1px solid rgba(255,255,255,.3)' }}
                  >
                    <p className="fw-bold mb-0 text-dark">Brad Pitt</p>
                    <p className="text-light small mb-0">
                      <MDBIcon far icon="clock" /> 10 mins ago
                    </p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </li>
              <li className="mb-3">
                <MDBTextArea label="Message" id="textAreaExample" rows={4} />
              </li>
              <MDBBtn color="light" size="lg" rounded className="float-end">
                Send
              </MDBBtn>
            </MDBTypography>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
}
