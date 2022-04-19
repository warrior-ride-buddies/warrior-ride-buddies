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
      day: 'monday',
      showDrivers: true,
      showRiders: true,
    };
  }

  changeUserType = (event) => {
    if (event.target.value === 'drivers') {
      this.setState({ showDrivers: true, showRiders: false });
    } else if (event.target.value === 'riders') {
      this.setState({ showDrivers: false, showRiders: true });
    } else if (event.target.value === 'both') {
      this.setState({ showDrivers: true, showRiders: true });
    }
  }

  filterUsers = (users) => {
    let returnVal = users;
    if (!(this.state.showDrivers === true && this.state.showRiders === true)) {
      if (this.state.showDrivers === true) {
        returnVal = users.filter(user => (user.arrivals.some(ride => (ride.driver === true))));
      } else if (this.state.showRiders === true) {
        returnVal = users.filter(user => (user.arrivals.some(ride => (ride.rider === true))));
      }
    }
    return returnVal;
  }
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div style={{ height: '100%', padding: '0px', margin: '0px' }}>
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
            Show:
            <select value={this.state.value} onChange={this.changeUserType}>
              <option value="drivers">Drivers</option>
              <option value="riders">Riders</option>
              <option value="both">Both</option>
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
