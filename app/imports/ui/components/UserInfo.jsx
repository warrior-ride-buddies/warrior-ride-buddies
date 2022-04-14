import React from 'react';
import { Grid, GridColumn, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class UserInfo extends React.Component {
  render() {
    return (
      <Grid>
        <GridColumn width={8}>
          <Header as='h1'>{this.props.user.firstName} {this.props.user.lastName}</Header>
          <p>{this.props.user.userType}<br/>{this.props.user.homeLocation}</p>
        </GridColumn>
        <GridColumn width={8} textAlign='right'>
          <Header as='h3'>Car Details</Header>
          <p>Car Make: {this.props.user.carMake}<br/>Car Model: {this.props.user.carModel}<br/>Car Color: {this.props.user.carColor}<br/>Car License Plate: {this.props.user.carPlate}</p>
        </GridColumn>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
UserInfo.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userType: PropTypes.string,
    homeLocation: PropTypes.string,
    carMake: PropTypes.string,
    carModel: PropTypes.string,
    carColor: PropTypes.string,
    carPlate: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserInfo;
