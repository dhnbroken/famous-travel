/* eslint-disable react-hooks/exhaustive-deps */
import 'src/App.css';
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import { getPlacesData } from 'src/api';
import List from 'src/components/List/List';
import Map from 'src/components/Map/Map';
import Header from 'src/components/Header/Header';
import { useContext } from 'react';
import { GlobalContextProvider } from 'src/GlobalContext/GlobalContext';

function Home() {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [bounds, setBounds] = useState({});
  const { coords, setCoords, currentCoords, setCurrentCoords } = useContext(GlobalContextProvider);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Object.keys(coords).length === 0 &&
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      });
    Object.keys(currentCoords).length === 0 &&
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCurrentCoords({ lat: latitude, lng: longitude });
      });
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);
  return (
    <React.Fragment>
      <Header setCoords={setCoords} />
      <CssBaseline />
      <Grid container spacing={3} sx={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            currentCoords={currentCoords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
