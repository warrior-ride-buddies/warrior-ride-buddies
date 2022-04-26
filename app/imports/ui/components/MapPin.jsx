import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import Schedule from '../components/Schedule';

class MapPin extends React.Component {
  render() {
    return (
      <div>
        <UserInfo user={this.props.user}/>
        <Header as='h2' textAlign='center' style={{ paddingTop: '30px' }}>Schedule</Header>
        <Schedule trips={this.props.user.trips}/>
      </div>
    );
  }
}

MapPin.propTypes = {
  user: PropTypes.object.isRequired,
};

export default withRouter(MapPin);
