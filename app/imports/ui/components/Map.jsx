import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import ApiKeys from '../../../ApiKeys.json';

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  marginTop: '0px',
};

const mapOptions = {
  mapTypeControl: false,
};

const center = {
  lat: 21.463254,
  lng: -158.117018,
};

class Map extends React.Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey={ApiKeys.mapsApiKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={mapOptions}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
