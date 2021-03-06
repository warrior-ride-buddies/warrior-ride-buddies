import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Form, Select, Header, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import PropTypes from 'prop-types';
import Map from '../components/Map/Map';
import { Users } from '../../api/user/User';
import Parse from '../../api/parse/parse';

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

const resetOptions = [{ key: 'arrivalTime', text: 'Arrival Time', value: 'arrivalTime' },
  { key: 'departureTime', text: 'Departure Time', value: 'departureTime' },
  { key: 'day', text: 'Day of the week', value: 'day' },
  { key: 'userType', text: 'User Type', value: 'userType' },
  { key: 'all', text: 'All', value: 'all' }];

const userTypeOptions = [
  { key: 'd', text: 'Drivers', value: 'driver' },
  { key: 'r', text: 'Riders', value: 'rider' },
  { key: 'b', text: 'Both', value: 'both' },
];

const defaultFilterParams = {
  day: 7,
  arrivalTime: 1440,
  departureTime: 1440,
  arrivalRange: 120,
  departureRange: 120,
  userType: 'both',
};

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      filterParams: {
        day: defaultFilterParams.day,
        arrivalTime: defaultFilterParams.arrivalTime,
        departureTime: defaultFilterParams.departureTime,
        arrivalRange: defaultFilterParams.arrivalRange,
        departureRange: defaultFilterParams.departureRange,
        userType: defaultFilterParams.userType,
      },
    };
  }

  changeUserType = (e, { value }) => {
    const userType = value;
    this.setState(prevState => ({
      filterParams: { ...prevState.filterParams,
        userType: userType,
      },
    }));
  }

  changeDay = (e, { value }) => {
    const day = parseInt(value, 10);
    this.setState(prevState => ({
      filterParams: { ...prevState.filterParams,
        day: day,
      },
    }));
  }

  changeArrivalTime = (event) => {
    const arrivalTime = Parse.timeToNum(event.target.value);
    this.setState(prevState => ({
      filterParams: { ...prevState.filterParams,
        arrivalTime: arrivalTime,
      },
    }));
  }

  changeDepartureTime = (event) => {
    const departureTime = Parse.timeToNum(event.target.value);
    this.setState(prevState => ({
      filterParams: { ...prevState.filterParams,
        departureTime: departureTime,
      },
    }));
  }

  filterTrips = (trips, filterParams) => {
    let returnVal = trips;
    const { day, arrivalTime, departureTime, arrivalRange, departureRange, userType } = filterParams;
    if (day !== defaultFilterParams.day) {
      returnVal = returnVal.filter(trip => (trip.day === day));
    }
    if (arrivalTime !== defaultFilterParams.arrivalTime) {
      returnVal = returnVal.filter(trip => (
        trip.arrivalTime <= arrivalTime) &&
        (trip.arrivalTime >= arrivalTime - arrivalRange));
    }
    if (departureTime !== defaultFilterParams.departureTime) {
      returnVal = returnVal.filter(trip => (
        trip.departureTime >= departureTime) &&
        (trip.departureTime <= departureTime + departureRange));
    }
    if (userType !== defaultFilterParams.userType) {
      returnVal = (returnVal.filter(trip => (trip.userType === userType)));
    }
    return returnVal;
  }

  filterUsers = (users) => {
    const returnVal = users.filter(user => (this.filterTrips(user.trips, this.state.filterParams).length > 0));
    return returnVal;
  }

  handleReset = (e, { value }) => {
    if (value === 'all') {
      this.setState({ filterParams: defaultFilterParams });
    } else {
      this.setState(prevState => ({
        filterParams: { ...prevState.filterParams,
          [value]: defaultFilterParams[value],
        },
      }));
    }
  }
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const currentUser = this.props.users.filter(user => (user.owner === this.props.email))[0];
    return (
      <div style={{ height: '100%', padding: '0px', margin: '0px' }} id={'main-page'}>
        <Form style={{ backgroundColor: 'gray', width: '25%', height: '70%', padding: '20px', position: 'absolute', zIndex: '1', margin: '50px 30px', borderRadius: '20px' }} id='main-filter'>
          <Header as='h2' textAlign='center' style={{ width: '100%' }}>Find your buddy</Header>
          <div className='accent-block' style={{ borderRadius: '5px', marginBottom: '20px', height: '2px', padding: '2px' }}>
          </div>
          <Form.Field>
            <label>Arriving to UH at:</label>
            <input type="time" name="Arrival Time" className="css-17rlcm6" onChange={this.changeArrivalTime} value={Parse.timeToString(this.state.filterParams.arrivalTime)}/>
          </Form.Field>
          <Form.Field>
            <label>Leaving UH at:</label>
            <input type="time" name="Departure Time" className="css-17rlcm6" onChange={this.changeDepartureTime} value={Parse.timeToString(this.state.filterParams.departureTime)}/>
          </Form.Field>
          <Form.Field
            control={Select}
            fluid
            label='Day of the Week:'
            options={dotwOptions}
            placeholder='Day of the Week'
            onChange={this.changeDay}
            value={String(this.state.filterParams.day)}
          />
          <Form.Field
            control={Select}
            fluid
            label='Show:'
            options={userTypeOptions}
            placeholder='Riders/Drivers'
            onChange={this.changeUserType}
            value={this.state.filterParams.userType}
          />
          <Dropdown text='' icon='erase' direction='left' style={{ float: 'right', padding: '0.5em 0.2em 0.5em 0.7em' }} className='ui compact black inverted button'>
            <Dropdown.Menu>
              <Dropdown.Header icon='filter' content='Reset the filters' />
              {resetOptions.map((option) => (
                <Dropdown.Item key={option.value} {...option} onClick={this.handleReset}/>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
        <Map users={this.filterUsers(this.props.users)} currentUser={currentUser}/>
      </div>
    );
  }
}

Main.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  email: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const email = Meteor.user() ? Meteor.user().username : '';
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const users = Users.collection.find({}).fetch();
  // Get the Stuff documents
  return {
    email,
    users,
    ready,
  };
})(Main);
