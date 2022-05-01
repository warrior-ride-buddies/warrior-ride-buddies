import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ScheduleRowEditable from './ScheduleRowEditable';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ScheduleEditable extends React.Component {
  render() {
    const trips = this.props.trips.sort((a, b) => (a.day - b.day));
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Day of the Week</Table.HeaderCell>
            <Table.HeaderCell>UHM Arrival Time</Table.HeaderCell>
            <Table.HeaderCell>UHM Departure Time</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {trips.map((trip, index) => <ScheduleRowEditable key={index} trip={trip} user={this.props.user} trips={trips}/>)}
        </Table.Body>
      </Table>
    );
  }
}

// Require a document to be passed to this component.
ScheduleEditable.propTypes = {
  trips: PropTypes.array,
  user: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ScheduleEditable);
