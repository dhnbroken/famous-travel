import React from 'react';
import { Row, Col, Button } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SidebarStyled = styled.div`
  background: #3f0e40;
  color: white;
  height: 100vh;
`;

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <SidebarStyled className="xs-h-100">
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
        <Col span={24}>
          <Button type="text" className="add-room text-white" onClick={() => navigate('/location')}>
            <FontAwesomeIcon icon={faLocation} />
            &ensp; Danh sách địa điểm đã lưu
          </Button>
        </Col>
      </Row>
    </SidebarStyled>
  );
}
