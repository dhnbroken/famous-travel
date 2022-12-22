import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from 'src/firebase/config';
import { addDocument, generateKeywords } from 'src/firebase/services';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async (provider) => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

    if (additionalUserInfo?.isNewUser) {
      addDocument('users', {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName?.toLowerCase()),
      });
    }
    localStorage.setItem('userId', user.uid);
    navigate('/chat');
  };

  React.useEffect(() => {
    const login = localStorage.getItem('userId');
    if (login) {
      navigate('/chat');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: 'center' }} level={3}>
            Travel Planner Group
          </Title>
          <Button style={{ width: '100%', marginBottom: 5 }} onClick={() => handleLogin(googleProvider)}>
            Đăng nhập bằng Google
          </Button>
          <Button style={{ width: '100%' }} onClick={() => handleLogin(fbProvider)}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}
