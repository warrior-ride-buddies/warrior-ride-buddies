import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { ApiKeys } from '../../../ApiKeys.json';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 21.29591292255475,
  lng: -157.8143491059391,
};

class Map extends React.Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey={ApiKeys}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
