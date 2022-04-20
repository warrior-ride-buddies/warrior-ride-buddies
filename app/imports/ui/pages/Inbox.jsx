import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Conversation from '../components/Conversation';
import { Profiles } from '../../api/profile/Profiles';
import { Messages } from '../../api/message/Messages';

class Inbox extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Profiles</Header>
        <Card.Group>
          {this.props.profiles.map((profile, index) => <Conversation key={index} profile={profile} messages={this.props.messages.filter(message => (message.profileId === profile._id))}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
Inbox.propTypes = {
  conversations: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Conversations.userPublicationName);
  const subscription2 = Meteor.subscribe(Messages.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const conversations = Conversations.collection.find({}).fetch();
  const messages = Messages.collection.find({}).fetch();
  return {
    conversations,
    messages,
    ready,
  };
})(Inbox);
