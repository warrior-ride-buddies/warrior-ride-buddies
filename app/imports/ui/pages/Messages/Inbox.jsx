import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import InboxItem from '../../components/Messages/InboxItem';
import { Conversations } from '../../../api/conversation/Conversations';
import { Users } from '../../../api/user/User';

class Inbox extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const currentUser = this.props.users.filter(user => (user.owner === this.props.currentUser))[0];
    const conversations = this.props.conversations.filter(conversation => (conversation.messages.length !== 0));
    let header;
    if (conversations.length !== 0) {
      header = <Header as="h1" textAlign="center">Inbox</Header>;
    } else {
      header = <Header as="h1" textAlign="center">Your messages will appear here</Header>;
    }
    return (
      <Container id={'inbox-page'}>
        {header}
        <Grid>
          {conversations.map((conversation, index) => <InboxItem
            key={index}
            currentUser={currentUser}
            conversations={[conversation]}
          />)}
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
Inbox.propTypes = {
  currentUser: PropTypes.string,
  conversations: PropTypes.array,
  users: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

const InboxContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Inbox);

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Conversations.userPublicationName);
  const subscription2 = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const conversations = Conversations.collection.find({}).fetch();
  const users = Users.collection.find({}).fetch();
  return {
    conversations,
    users,
    ready,
  };
})(InboxContainer);
