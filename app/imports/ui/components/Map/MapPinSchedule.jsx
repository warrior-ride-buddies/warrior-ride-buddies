import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ScheduleRow from '../UserProfile/ScheduleRow';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MapPinSchedule extends React.Component {
  render() {
    const trips = this.props.trips.sort((a, b) => (a.day - b.day));
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Day</Table.HeaderCell>
            <Table.HeaderCell>Gets to UHM at</Table.HeaderCell>
            <Table.HeaderCell>Leaves UHM at</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {trips.map((trip, index) => <ScheduleRow key={index} trip={trip} />)}
        </Table.Body>
      </Table>
    );
  }
}

// Require a document to be passed to this component.
MapPinSchedule.propTypes = {
  trips: PropTypes.array,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default MapPinSchedule;
