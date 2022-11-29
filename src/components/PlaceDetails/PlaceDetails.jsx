import React, { useState } from 'react';

import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, Rating } from '@mui/material';
import { LocationOn, Phone } from '@mui/icons-material';

import useStyles from './styles';
import { useEffect } from 'react';
import { getPlace, savePlace } from '../../api/plan-service';
const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const classes = useStyles();
  const [placeSaved, setPlaceSaved] = useState([]);

  const getPlaceSaved = async () => {
    try {
      const res = await getPlace();
      setPlaceSaved(res);
    } catch (error) {}
  };
  useEffect(() => {
    getPlaceSaved();
  }, []);
  useEffect(() => {
    console.log(placeSaved);
  }, [placeSaved]);

  const handleSavePlace = async (place) => {
    const data = {
      name: place.name,
      type: 'Point',
      longitude: place.longitude,
      latitude: place.latitude,
    };
    await savePlace(data);
    await getPlaceSaved();
  };

  const handleDeletePlace = async (place) => {
    console.log(place);
  };

  return (
    <Card elevation={6}>
      <CardMedia
        sx={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            {place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1" sx={{ float: 'left' }}>
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
            <LocationOn />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={classes.spacing}>
            <Phone /> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        {place.website && (
          <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
            Website
          </Button>
        )}
        <Button
          size="small"
          color="primary"
          onClick={() => {
            handleSavePlace(place);
          }}
        >
          Add to plan
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            handleDeletePlace(place);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
