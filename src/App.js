import './App.css';
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import { getPlacesData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

function App() {
    const [places, setPlaces] = useState([]);

    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoords({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        getPlacesData(bounds.sw, bounds.ne).then((data) => {
            setPlaces(data);
        });
    }, [bounds]);
    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} sx={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={places} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map setCoords={setCoords} setBounds={setBounds} coords={coords} places={places} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default App;
