import React from 'react';
import { Form, Select, Button, Table, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Parse from '../../../api/parse/parse';
import { Users } from '../../../api/user/User';

const userTypeOptions = [
  { key: 'd', text: 'Driver', value: 'driver' },
  { key: 'r', text: 'Rider', value: 'rider' },
  { key: 'b', text: 'Both', value: 'both' },
];

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ScheduleRowEditable extends React.Component {
  changeArrivalTime = (event) => {
    const arrivalTime = Parse.timeToNum(event.target.value);
    this.updateTrip(arrivalTime, 'arrivalTime');
  }

  updateTrip = (value, name) => {
    const day = this.props.trip.day;
    const trips = this.props.user.trips;
    for (let i = 0; i < trips.length; i++) {
      if (trips[i].day === day) {
        trips[i][name] = value;
      }
    }

    Users.collection.update({ _id: this.props.user._id }, { $set: { trips: trips } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        }
      });
  }

  changeDepartureTime = (event) => {
    const departureTime = Parse.timeToNum(event.target.value);
    this.updateTrip(departureTime, 'departureTime');
  }

  changeUserType = (e, { value }) => {
    const userType = value;
    this.updateTrip(userType, 'userType');
  }

  removeTrip = () => {
    const trips = this.props.user.trips;
    const day = this.props.trip.day;
    trips.splice(trips.findIndex(function (trip) {
      return trip.day === day;
    }), 1);
    Users.collection.update({ _id: this.props.user._id }, { $set: { trips: trips } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        }
      });
  }

  render() {
    const trip = this.props.trip;
    return (
      <Table.Row>
        <Table.Cell>{Parse.dayToString(trip.day)}</Table.Cell>
        <Table.Cell><Input type="time" name="Arrival Time" className="css-17rlcm6" onChange={this.changeArrivalTime} value={Parse.timeToString(trip.arrivalTime)}/></Table.Cell>
        <Table.Cell><Input type="time" name="Departure Time" className="css-17rlcm6" onChange={this.changeDepartureTime} value={Parse.timeToString(trip.departureTime)}/></Table.Cell>
        <Table.Cell><Form.Field
          control={Select}
          fluid
          options={userTypeOptions}
          placeholder='Riders/Drivers'
          onChange={this.changeUserType}
          value={this.props.trip.userType}
        /></Table.Cell>
        <Table.Cell><Button icon='remove circle' onClick={this.removeTrip}/></Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ScheduleRowEditable.propTypes = {
  trips: PropTypes.array,
  trip: PropTypes.shape({
    day: PropTypes.number,
    arrivalTime: PropTypes.number, // minutes
    departureTime: PropTypes.number,
    userType: PropTypes.string,
  }).isRequired,
  user: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default ScheduleRowEditable;
