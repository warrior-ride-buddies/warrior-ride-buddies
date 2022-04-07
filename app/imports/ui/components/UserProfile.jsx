import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <p style={{ backgroundColor: 'grey' }}>Hello</p>
        </Grid.Column>
        <Grid.Column width={12}>
          <p style={{ backgroundColor: 'green' }}>Hello</p>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
UserProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userType: PropTypes.string,
    homeLocation: PropTypes.string,
    carMake: PropTypes.string,
    carModel: PropTypes.string,
    carPlate: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

UserProfile.propTypes = {
  availability: PropTypes.shape({
    monday: PropTypes.array,
    tuesday: PropTypes.array,
    wednesday: PropTypes.array,
    thursday: PropTypes.array,
    friday: PropTypes.array,
    _id: PropTypes.array,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserProfile);
