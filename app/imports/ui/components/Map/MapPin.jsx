import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UserInfo from '../UserProfile/UserInfo';
import Schedule from '../UserProfile/Schedule';
import CreateReport from '../UserProfile/CreateReport';
import { Conversations } from '../../../api/conversation/Conversations';

class MapPin extends React.Component {
  render() {
    const selectedUser = this.props.selectedUser;
    return (
      <div>
        <UserInfo user={selectedUser}/>
        <Header as='h2' textAlign='center' style={{ paddingTop: '30px' }}>Schedule</Header>
        <Schedule trips={selectedUser.trips}/>
        <CreateReport reportedUser={selectedUser.owner} conversations={this.props.conversations} currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

MapPin.propTypes = {
  selectedUser: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired,
  conversations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

const MapPinContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(MapPin);

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
})(MapPinContainer);