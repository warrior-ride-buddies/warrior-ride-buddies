import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Parse from '../../api/parse/parse';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ScheduleRow extends React.Component {
  render() {
    const trip = this.props.trip;
    const parse = new Parse();
    return (
      <Table.Row>
        <Table.Cell>{parse.dayToString(trip.day)}</Table.Cell>
        <Table.Cell>{parse.timeToString(trip.arrivalTime)}</Table.Cell>
        <Table.Cell>{parse.timeToString((trip.departureTime))}</Table.Cell>
        <Table.Cell>{trip.userType}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ScheduleRow.propTypes = {
  trip: PropTypes.shape({
    day: PropTypes.number,
    arrivalTime: PropTypes.number, // minutes
    departureTime: PropTypes.number,
    userType: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ScheduleRow);
