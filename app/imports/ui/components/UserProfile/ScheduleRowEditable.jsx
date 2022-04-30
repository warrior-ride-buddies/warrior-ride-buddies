import React from 'react';
import { Form, Grid, Select } from 'semantic-ui-react';
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

  render() {
    const trip = this.props.trip;
    return (
      <Grid.Row columns={4}>
        <Grid.Column>{Parse.dayToString(trip.day)}</Grid.Column>
        <Grid.Column><input type="time" name="Arrival Time" className="css-17rlcm6" onChange={this.changeArrivalTime} value={Parse.timeToString(trip.arrivalTime)}/></Grid.Column>
        <Grid.Column><input type="time" name="Departure Time" className="css-17rlcm6" onChange={this.changeDepartureTime} value={Parse.timeToString(trip.departureTime)}/></Grid.Column>
        <Grid.Column>
          <Form.Field
            control={Select}
            fluid
            options={userTypeOptions}
            placeholder='Riders/Drivers'
            onChange={this.changeUserType}
            value={this.props.trip.userType}
          />
        </Grid.Column>
      </Grid.Row>
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
