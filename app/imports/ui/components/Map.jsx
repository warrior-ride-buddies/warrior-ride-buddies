import React from 'react';
import { Meteor } from 'meteor/meteor';
import { InfoWindow, Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import ApiKeys from '../../../ApiKeys.json';
import { Users } from '../../api/user/User';

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
      activeLat: null,
      activeLng: null,
      selectedUser: {},
    };
  }

  onMarkerClick = (user) => this.setState({
    selectedUser: user,
    activeLat: user.lat,
    activeLng: user.lng,
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
    return (this.props.ready) ? this.renderComp() : <Loader active>Getting data</Loader>;
  }

  renderComp() {
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
              position={{ lat: user.lat, lng: user.lng }}
              icon='./images/personIcon.png'
              clickable = {true}
              onClick={ () => this.onMarkerClick(user) }
            />)
          }
          {this.state.isOpen &&
            <InfoWindow
              position={{ lat: this.state.activeLat, lng: this.state.activeLng }} onCloseClick={this.onClose}
            >
              <div>
                <h4>{this.state.selectedUser.firstName}</h4>
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(Map);
