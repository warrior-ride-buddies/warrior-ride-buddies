import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserCard extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            bordered
            floated='right'
            size='mini'
            src={this.props.user.image}
          />
          <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
          <Card.Meta>{this.props.user.address}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/profile/${this.props.user.owner}`}>View Profile</Link>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    carMake: PropTypes.string,
    carModel: PropTypes.string,
    carColor: PropTypes.string,
    carPlate: PropTypes.string,
    owner: PropTypes.string,
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserCard);
