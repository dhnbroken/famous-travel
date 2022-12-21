import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns/esm';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useContext } from 'react';
import { GlobalContextProvider } from 'src/GlobalContext/GlobalContext';
import { useNavigate } from 'react-router-dom';

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

function formatDate(seconds) {
  let formattedDate = '';

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({
  text,
  displayName,
  createdAt,
  photoURL,
  placeImg,
  placeName,
  placeAddress,
  placeLongitude,
  placeLatitude,
}) {
  const { setCoords } = useContext(GlobalContextProvider);
  const navigate = useNavigate();

  const showInfoPlace = () => {
    setCoords({ lat: placeLatitude, lng: placeLongitude });
    navigate('/');
  };
  return (
    <WrapperStyled>
      <div>
        <Avatar size="small" src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">{formatDate(createdAt?.seconds)}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{text}</Typography.Text>
        {placeImg && (
          <MDBCard className="content" style={{ maxWidth: '540px' }} onClick={showInfoPlace}>
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage src={placeImg} alt="..." fluid />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle>{placeName}</MDBCardTitle>
                  <MDBCardText style={{ whiteSpace: 'normal' }}>{placeAddress}</MDBCardText>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        )}
      </div>
    </WrapperStyled>
  );
}
