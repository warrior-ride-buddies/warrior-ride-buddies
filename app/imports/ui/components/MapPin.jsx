import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UserInfo from '../components/UserInfo';

class MapPin extends React.Component {
  render() {
    return (
      <div>
        <UserInfo user={this.props.user}/>
        <Header as='h2' textAlign='center' style={{ paddingTop: '30px' }}>Availability</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Day of the Week</Table.HeaderCell>
              <Table.HeaderCell>UHM Arrival Time</Table.HeaderCell>
              <Table.HeaderCell>UHM Departure Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Monday</Table.Cell>
              <Table.Cell>10:00AM</Table.Cell>
              <Table.Cell>10:00PM</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

MapPin.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MapPin;
