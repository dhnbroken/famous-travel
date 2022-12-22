import React, { useState, useEffect, createRef } from 'react';

import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [elRefs, setElRefs] = useState([]);
  useEffect(() => {
    setElRefs((refs) =>
      Array(places.length)
        .fill()
        .map((_, i) => refs[i] || createRef()),
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurant, Hotels & Attractions around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div className="mb-3">
            <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="restaurants">Restaurant</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={[classes.formControl, 'ml-3']}>
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Grid container spacing={3} className={classes.list}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                size="large"
                className="btn btn-outline-primary "
                onClick={() => navigate('/location')}
              >
                Địa điểm đã lưu
              </Button>
            </Grid>
            {places?.map((place, index) => (
              <Grid item key={index} xs={12}>
                <PlaceDetails place={place} selected={Number(childClicked === index)} refProp={elRefs[index]} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
