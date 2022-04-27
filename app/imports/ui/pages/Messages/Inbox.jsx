import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, List, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Conversation from '../../components/Messages/Conversation';
import { Conversations } from '../../../api/conversation/Conversations';

class Inbox extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id={'inbox-page'}>
        <Header as="h2" textAlign="center" style={{ paddingTop: '20px' }} id={'Inbox-page'} >Message Your Buddy</Header>
        <List divided relaxed>
          {this.props.conversations.map((conversation, index) => <Conversation
            key={index}
            currentUser={this.props.currentUser}
            conversation={conversation}
          />)}
        </List>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
Inbox.propTypes = {
  currentUser: PropTypes.string,
  conversations: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

const InboxContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Inbox);

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Conversations.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const conversations = Conversations.collection.find({}).fetch();
  return {
    conversations,
    ready,
  };
})(InboxContainer);
