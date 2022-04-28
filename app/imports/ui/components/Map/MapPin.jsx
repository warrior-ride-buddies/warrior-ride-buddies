import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Button } from 'semantic-ui-react';
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
    const selectedUser = this.props.selectedUser;
    const currentUser = this.props.currentUser;
    const conversations = this.props.conversations.filter((conversation) => (conversation.users.some((user) => (user.username === selectedUser.owner && user.username))));
    let createNew = [];
    if (conversations.length === 0) { createNew = [1]; }
    return (
      <div>
        <UserInfo user={selectedUser}/>
        <Header as='h2' textAlign='center' style={{ paddingTop: '30px' }}>Schedule</Header>
        <Schedule trips={selectedUser.trips}/>
        {createNew.map((index) => <Button key={index}>Hello</Button>)}
        {conversations.map((conversation, index) => <Conversation key={index} currentUser={currentUser.owner} conversation={conversation}/>)}
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
