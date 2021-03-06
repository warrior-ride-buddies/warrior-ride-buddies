import React from 'react';
import { InfoWindow, Marker, GoogleMap } from '@react-google-maps/api';

import PropTypes from 'prop-types';
import MapPin from './MapPin';

const containerStyle = {
  width: '100%',
  height: '88.5%',
  position: 'absolute',
  marginTop: '0px',
};

const zoom = 11;

const mapOptions = {
  mapTypeControl: false,
  minZoom: zoom,
  restriction: {
    latLngBounds: {
      north: 30,
      south: 10,
      east: -100,
      west: 200,
    },
  },
};

const center = {
  lat: 21.483254,
  lng: -158.097018,
};

class Map extends React.Component {

  constructor() {
    super();
    this.state = {
      isOpen: false, // Hides or shows the InfoWindow
      activePosition: {},
      selectedUser: {},
    };
  }

  onMarkerClick = (user) => this.setState({
    selectedUser: user,
    activePosition: user.position,
    isOpen: true,
  });

  onClose = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  render() {
    const users = this.props.users;
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={mapOptions}
      >
        {
          users.map((user, index) => <Marker
            key={index}
            position={user.position}
            icon='./images/personIcon.png'
            clickable = {true}
            onClick={ () => this.onMarkerClick(user) }
          />)
        }
        {this.state.isOpen &&
            <InfoWindow
              position={this.state.activePosition}
              onCloseClick={this.onClose}
              options={{ pixelOffset: { height: -30, width: 0 } }}
            >
              <div className='scrollFix'>
                <MapPin selectedUser={this.state.selectedUser} currentUser={this.props.currentUser}/>
              </div>
            </InfoWindow>
        }
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Map;
