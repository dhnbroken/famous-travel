import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CardPlace from './CardPlace';
import { GlobalContextProvider } from 'src/GlobalContext/GlobalContext';

export default function PlaceSaved(props) {
  const { open, anchorEl, handleClose, placeSaved } = props;
  const { setPlaceImg, setPlaceAddress, setPlaceName, setPlaceLatitude, setPlaceLongitude } =
    React.useContext(GlobalContextProvider);

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {placeSaved.length &&
          placeSaved.map((place) => (
            <MenuItem
              key={place._id}
              onClick={() => {
                setPlaceImg(place.photoPath);
                setPlaceName(place.name);
                setPlaceAddress(place.address);
                setPlaceLongitude(place.longitude);
                setPlaceLatitude(place.latitude);
                handleClose();
              }}
            >
              {/* {place.name} */}
              <CardPlace place={place} />
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}
