import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UserInfo from '../UserProfile/UserInfo';
import Schedule from '../UserProfile/Schedule';
import CreateReport from '../UserProfile/CreateReport';
import { Conversations } from '../../../api/conversation/Conversations';
import Conversation from '../Messages/Conversation';

class MapPin extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      createNew: [],
    };
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const selectedUser = this.props.selectedUser;
    const currentUser = this.props.currentUser;
    const conversations = this.props.conversations.filter((conversation) => (conversation.users.some((user) => (user.username === selectedUser.owner))));
    console.log(conversations);
    console.log(this.props.conversations);
    return (
      <div>
        <UserInfo user={selectedUser}/>
        <Header as='h2' textAlign='center' style={{ paddingTop: '30px' }}>Schedule</Header>
        <Schedule trips={selectedUser.trips}/>
        <Conversation currentUser={currentUser} conversations={conversations} selectedUser={selectedUser}/>
        <CreateReport reportedUser={selectedUser.owner} conversations={this.props.conversations} currentUser={currentUser.owner}/>
      </div>
    );
  }
}

MapPin.propTypes = {
  selectedUser: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

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
})(MapPin);
