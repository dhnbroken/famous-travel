import React, { useContext, useEffect } from 'react';
import { GlobalContextProvider } from 'src/GlobalContext/GlobalContext';
import { removePlace } from 'src/api/plan-service';
import Sidebar from 'src/components/ChatRoom/Sidebar';
import { Row, Col } from 'antd';
import { Spin } from 'antd';

function Location() {
  const { getPlaceSaved, placeSaved, setPlaceSaved, setLoading, loading } = useContext(GlobalContextProvider);

  useEffect(() => {
    setLoading(true);
    getPlaceSaved();
  }, []);

  const handleRemovePlace = (id) => {
    removePlace(id);
    const newPlaceSaved = placeSaved.filter((place) => place._id !== id);
    setPlaceSaved(newPlaceSaved);
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
                    <div key={index} className="col-xl-3 col-sm-6 mb-5">
                      <div className="bg-white shadow-sm py-5 px-4">
                        <img
                          src={place.photoPath}
                          alt="avatar"
                          width="100"
                          className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                        />
                        <h5 className="mb-0">{place.name}</h5>
                        {/* <span className="small text-uppercase text-muted"></span> */}
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
