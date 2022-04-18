import React from 'react';
import { InfoWindow, Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import ApiKeys from '../../../ApiKeys.json';
import CreateReport from './CreateReport';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 21.29591292255475,
  lng: -157.8143491059391,
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
      <LoadScript
        googleMapsApiKey={ApiKeys.mapsApiKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
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
              position={this.state.activePosition} onCloseClick={this.onClose}
            >
              <div>
                <h4>{this.state.selectedUser.firstName}</h4>
                <h4>{this.state.selectedUser.schedule[1].time.toString()}</h4>
                <h4>{this.state.selectedUser.schedule[0].rider.toString()}</h4>
                <CreateReport/>
              </div>
            </InfoWindow>
          }
        </GoogleMap>
      </LoadScript>
    );
  }
}

Map.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Map;
