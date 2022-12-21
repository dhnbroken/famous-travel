/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { GlobalContextProvider } from 'src/GlobalContext/GlobalContext';
import { removePlace } from 'src/api/plan-service';
import Sidebar from 'src/components/ChatRoom/Sidebar';
import { Row, Col } from 'antd';
import { Spin } from 'antd';
import { CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Location() {
  const navigate = useNavigate();
  const { getPlaceSaved, placeSaved, setPlaceSaved, setLoading, loading, setCoords } =
    useContext(GlobalContextProvider);

  useEffect(() => {
    setLoading(true);
    getPlaceSaved();
  }, []);

  const handleRemovePlace = (id) => {
    removePlace(id);
    const newPlaceSaved = placeSaved.filter((place) => place._id !== id);
    setPlaceSaved(newPlaceSaved);
  };

  const showPlaceInMap = (place) => {
    setCoords({ lat: place.latitude, lng: place.longitude });
    navigate('/');
  };

  return (
    <React.Fragment>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        {loading ? (
          <Spin style={{ position: 'fixed', inset: 0 }} />
        ) : (
          <Col span={18}>
            <div className="container py-5">
              <div className="row text-center">
                {!!placeSaved.length ? (
                  placeSaved?.map((place, index) => (
                    <div key={index} className="col-xl-3 col-sm-6 mb-5" onClick={() => showPlaceInMap(place)}>
                      <div className="bg-white shadow-sm py-5 px-4">
                        <CardMedia
                          sx={{ height: 150 }}
                          image={
                            place.photoPath
                              ? place.photoPath
                              : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                          }
                          title={place.name}
                        />
                        <h5 className="my-3">{place.name}</h5>
                        <button
                          className="container btn btn-outline-warning"
                          onClick={() => handleRemovePlace(place._id)}
                        >
                          Remove location
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Chua co dia diem nao duoc luu</div>
                )}
              </div>
            </div>
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
}

export default Location;
