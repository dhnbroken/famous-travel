import React from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function CardPlace(props) {
  const { place } = props;
  return (
    <MDBCard style={{ maxWidth: '540px' }}>
      <MDBRow className="g-0">
        <MDBCol md="4">
          <MDBCardImage src={place.photoPath} alt="..." fluid />
        </MDBCol>
        <MDBCol md="8">
          <MDBCardBody>
            <MDBCardTitle>{place.name}</MDBCardTitle>
            <MDBCardText style={{ whiteSpace: 'normal' }}>{place.address}</MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
  );
}
