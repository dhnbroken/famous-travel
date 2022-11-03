import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Rating } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';

import useStyles from './styles';

const Map = ({ setCoords, setBounds, coords, places }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBJ9zDvb7SGEOr3PzTSRn4N0R7YujQcbUA' }}
                defaultCenter={coords}
                center={coords}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoords({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={() => {}}
            >
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
                                        src={
                                            place.photo
                                                ? place.photo.images.large.url
                                                : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                                        }
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

export default Map;
