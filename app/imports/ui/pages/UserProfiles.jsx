import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CardGroup, Container, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';
import UserCard from '../components/UserCard';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfiles extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container style={{ paddingTop: '20px' }}>
        <div style={{ backgroundColor: 'grey', borderRadius: '20px', paddingBottom: '40px' }}>
          <Header as="h2" textAlign="center" style={{ paddingTop: '20px' }}>View Profiles</Header>
          <CardGroup centered>
            {this.props.users.map((user, index) => <UserCard key={index} user={user}/>)}
          </CardGroup>
        </div>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
UserProfiles.propTypes = {
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
})(UserProfiles);
