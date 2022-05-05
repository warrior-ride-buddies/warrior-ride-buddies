import React from 'react';
import { Grid, GridRow, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** The MapPinUserInfo component is visible in every User Profile. Rendered by the User Profile component. */
class MapPinUserInfo extends React.Component {
  render() {
    return (
      <Grid textAlign='center' columns={1}>
        <GridRow>
          <Link to={`/profile/${this.props.user.owner}`}>
            <Header as='h1'>{this.props.user.firstName} {this.props.user.lastName}</Header>
          </Link>
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
  user: PropTypes.object.isRequired,
};

export default MapPinUserInfo;
