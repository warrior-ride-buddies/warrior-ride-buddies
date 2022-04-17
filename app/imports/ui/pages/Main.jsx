import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Form, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Map from '../components/Map';

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
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Main extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <Form style={{ backgroundColor: 'gray', width: '100%', height: '100%', padding: '20px' }}>
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
            <Form.Select
              fluid
              label='Show:'
              options={Options}
              placeholder='Riders/Drivers'
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={12}>
          <Map/>
        </Grid.Column>
      </Grid>
    );
  }
}

Main.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(Main);