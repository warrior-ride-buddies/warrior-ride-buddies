import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ScheduleRowEditable from './ScheduleRowEditable';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ScheduleEditable extends React.Component {
  render() {
    const trips = this.props.trips.sort((a, b) => (a.day - b.day));
    return (
      <Grid>
        <Grid.Row columns={5}>
          <Grid.Column>Day of the Week</Grid.Column>
          <Grid.Column>UHM Arrival Time</Grid.Column>
          <Grid.Column>UHM Departure Time</Grid.Column>
          <Grid.Column>Role</Grid.Column>
          <Grid.Column>Remove</Grid.Column>
        </Grid.Row>
        {trips.map((trip, index) => <ScheduleRowEditable key={index} trip={trip} user={this.props.user} trips={trips}/>)}
      </Grid>
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
