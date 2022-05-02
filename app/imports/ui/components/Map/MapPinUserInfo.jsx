import React from 'react';
import { Grid, GridRow, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** The MapPinUserInfo component is visible in every User Profile. Rendered by the User Profile component. */
class MapPinUserInfo extends React.Component {
  render() {
    return (
      <Grid textAlign='center' columns={1}>
        <GridRow>
          <Header as='h1'>{this.props.user.firstName} {this.props.user.lastName}</Header>
        </GridRow>
        <GridRow>
          <Image src={this.props.user.image} avatar size='small'/>
        </GridRow>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
MapPinUserInfo.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userType: PropTypes.string,
    address: PropTypes.string,
    carMake: PropTypes.string,
    carModel: PropTypes.string,
    carColor: PropTypes.string,
    carPlate: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default MapPinUserInfo;
