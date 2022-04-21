import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Form, Select, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Map from '../components/Map';
import { Users } from '../../api/user/User';

const dotwOptions = [
  { key: 'mon', text: 'Monday', value: 'monday' },
  { key: 'tue', text: 'Tuesday', value: 'tuesday' },
  { key: 'wed', text: 'Wednesday', value: 'wednesday' },
  { key: 'thu', text: 'Thursday', value: 'thursday' },
  { key: 'fri', text: 'Friday', value: 'friday' },
  { key: 'sat', text: 'Saturday', value: 'saturday' },
  { key: 'sun', text: 'Sunday', value: 'sunday' },
];

const Options = [
  { key: 'd', text: 'Drivers', value: 'drivers' },
  { key: 'r', text: 'Riders', value: 'riders' },
  { key: 'b', text: 'Both', value: 'both' },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      day: 7,
      userType: 'both',
    };
  }

  changeUserType = (event) => {
    this.setState({ userType: event.target.value });
  }

  changeDay = (event) => {
    this.setState({ day: parseInt(event.target.value, 10) });
  }

  filterRides = (rides, day, userType) => {
    let returnVal = rides;
    if (day !== 7) {
      returnVal = returnVal.filter(ride => (ride.time.getDay() === day));
    }
    returnVal = (returnVal.filter(ride => (userType === 'both' || ride.userType === userType)));
    return returnVal;
  }

  filterUsers = (users) => {
    const returnVal = users.filter(user => (this.filterRides(user.arrivals, this.state.day, this.state.userType).length > 0));
    return returnVal;
  }
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div style={{ height: '100%', padding: '0px', margin: '0px' }} id={'main-page'}>
        <Form style={{ backgroundColor: 'gray', width: '25%', height: '70%', padding: '20px', position: 'absolute', zIndex: '1', margin: '50px 30px', borderRadius: '20px' }}>
          <Form.Field>
            <label>Zip Code</label>
            <input placeholder='Zip Code' style={{ backgroundColor: 'white' }}/>
          </Form.Field>
          <Form.Field>
            <label>Arrival Time</label>
            <input placeholder='Arrival Time' style={{ backgroundColor: 'white' }}/>
          </Form.Field>
          <Form.Select
            fluid
            label='Day of the Week'
            options={dotwOptions}
            placeholder='Day of the Week'
          />
          <Select
            fluid
            options={Options}
            placeholder='Riders/Drivers'
            value={this.state.value}
            onChange={this.changeUserType}
          />
          <Label style={{ backgroundColor: 'gray', width: '100%' }}>
            Day of the Week
            <select value={this.state.value} onChange={this.changeDay}>
              <option value="7">All</option>
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
              <option value="6">Saturday</option>
              <option value="0">Sunday</option>
            </select>
          </Label>
          <Label style={{ backgroundColor: 'gray', width: '100%' }}>
            Show:
            <select value={this.state.value} onChange={this.changeUserType}>
              <option value="both">Both</option>
              <option value="driver">Drivers</option>
              <option value="rider">Riders</option>
            </select>
          </Label>
        </Form>
        <Map users={this.filterUsers(this.props.users)}/>
      </div>
    );
  }
}

Main.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
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
})(Main);
