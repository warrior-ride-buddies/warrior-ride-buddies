import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Form, Select } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import PropTypes from 'prop-types';
import Map from '../components/Map';
import { Users } from '../../api/user/User';

const dotwOptions = [
  { key: 'all', text: 'All', value: '7' },
  { key: 'mon', text: 'Monday', value: '1' },
  { key: 'tue', text: 'Tuesday', value: '2' },
  { key: 'wed', text: 'Wednesday', value: '3' },
  { key: 'thu', text: 'Thursday', value: '4' },
  { key: 'fri', text: 'Friday', value: '5' },
  { key: 'sat', text: 'Saturday', value: '6' },
  { key: 'sun', text: 'Sunday', value: '0' },
];

const Options = [
  { key: 'd', text: 'Drivers', value: 'driver' },
  { key: 'r', text: 'Riders', value: 'rider' },
  { key: 'b', text: 'Both', value: 'both' },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      filterParams: {
        day: 7,
        arrivalTime: 2460,
        departureTime: 2460,
        rangeTime: 200,
        userType: 'both',
      },
    };
  }

  changeUserType = (e, { value }) => {
    this.setState({ userType: value });
  }

  changeDay = (e, { value }) => {
    this.setState({ day: parseInt(value, 10) });
  }

  changeArrivalTime = (event) => {
    const arrivalTime = parseInt(event.target.value.substring(0, 2) + event.target.value.substring(3, 5), 10);
    this.setState(prevState => ({
      filterParams: { ...prevState.filterParams,
        arrivalTime: arrivalTime,
      },
    }));
    setTimeout(() => { console.log(this.state.filterParams.arrivalTime); }, 1000);
  }

  changeDepartureTime = (event) => {
    const departureTime = parseInt(event.target.value.substring(0, 2) + event.target.value.substring(3, 5), 10);
    this.setState(prevState => ({
      filterParams: { ...prevState.filterParams,
        departureTime: departureTime,
      },
    }));
    setTimeout(() => { console.log(this.state.filterParams.departureTime); }, 1000);
  }

  filterRides = (rides, filterParams) => {
    let returnVal = rides;
    const { day, arrivalTime, departureTime, rangeTime, userType } = filterParams;
    if (filterParams.day !== 7) {
      returnVal = returnVal.filter(ride => (ride.time.getDay() === day));
    }
    if (arrivalTime !== 2460) {
      returnVal = returnVal.filter(ride => (
        ((100 * ride.time.getHours() + ride.time.getMinutes()) <= arrivalTime) &&
        ((100 * ride.time.getHours() + ride.time.getMinutes()) >= arrivalTime - rangeTime)));
    }
    returnVal = (returnVal.filter(ride => (userType === 'both' || ride.userType === userType)));
    return returnVal;
  }

  filterUsers = (users) => {
    const returnVal = users.filter(user => (this.filterRides(user.arrivals, this.state.filterParams).length > 0));
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
            <input type="time" name="Arrival Time" className="css-17rlcm6" onChange={this.changeArrivalTime}/>
          </Form.Field>
          <Form.Field>
            <label>Departure Time</label>
            <input type="time" name="Departure Time" className="css-17rlcm6" onChange={this.changeDepartureTime}/>
          </Form.Field>
          <Form.Field
            control={Select}
            fluid
            label='Day of the Week'
            options={dotwOptions}
            placeholder='Day of the Week'
            onChange={this.changeDay}
          />
          <Form.Field
            control={Select}
            fluid
            label='Show:'
            options={Options}
            placeholder='Riders/Drivers'
            onChange={this.changeUserType}
          />
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
