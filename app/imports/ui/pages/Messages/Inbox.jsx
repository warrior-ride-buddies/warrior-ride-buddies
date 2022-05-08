import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Dropdown, } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import InboxItem from '../../components/Messages/InboxItem';
import CreatePool from '../../components/Messages/CreatePool';
import { Conversations } from '../../../api/conversation/Conversations';
import { Users } from '../../../api/user/User';

class Inbox extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedUsers: [],
    };
  }

  handleSelect = (e, { value }) => {
    this.setState({ selectedUsers: value });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    console.log(this.state.selectedUsers);
    const currentUser = this.props.users.filter(user => (user.owner === this.props.currentUser))[0];
    const otherUsers = this.props.users.filter((user) => (user.owner !== currentUser.owner));
    const conversations = this.props.conversations.filter(conversation => (conversation.messages.length !== 0)); // Prevents an inboxItem from showing up before a message is sent when another user clicks their message button.
    const listUsers = otherUsers.map((user) => ({ text: `${user.firstName} ${user.lastName}`, value: user.owner })); // Array to pass to the multiple select dropdown.
    let header;
    if (conversations.length !== 0) {
      header = <Header as="h1" textAlign="center">Inbox</Header>;
    } else {
      header = <Header as="h1" textAlign="center">Your messages will appear here</Header>;
    }
    return (
      <Container id={'inbox-page'} style={{ paddingTop: '20px' }}>
        {header}
        <div className='accent-block' style={{ borderRadius: '2px', marginBottom: '20px', opacity: '0.95', height: '1px', padding: '4px' }}>
        </div>
        <Grid columns={2}>
          <Grid.Column>
            <Dropdown
              placeholder='Add people'
              fluid
              multiple
              search
              selection
              options={listUsers}
              onChange={this.handleSelect}
            />
          </Grid.Column>
          <Grid.Column>
            <CreatePool selectedUsers={this.state.selectedUsers} currentUser={currentUser} users={this.props.users} conversations={this.props.conversations} />
          </Grid.Column>
        </Grid>
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
