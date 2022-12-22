import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Rating } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';

import useStyles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
const AnyReactComponent = () => (
  <div className="z-1000">
    <FontAwesomeIcon icon={faLocationDot} className="fa-3x text-xl text-danger" />
  </div>
);
const MapDetails = ({ setCoords, setBounds, coords, places, setChildClicked, currentCoords }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width: 600px)');
  const placesPhoto =
    'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg';

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBiGfPp16PMOfTfnvoqW9uRNNoNtJORsVg' }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {/* <Marker position={coords} /> */}
        <AnyReactComponent lat={currentCoords.lat} lng={currentCoords.lng} />
        {!!places?.length &&
          places?.map((place, index) => (
            <div
              className={classes.markerContainer}
              key={index}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
            >
              {!isDesktop ? (
                <LocationOnOutlined color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2">
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : placesPhoto}
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapDetails;
