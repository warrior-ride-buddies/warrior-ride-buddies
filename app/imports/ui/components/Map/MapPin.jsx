import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Loader, Grid, GridColumn } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import MapPinUserInfo from './MapPinUserInfo';
import MapPinSchedule from './MapPinSchedule';
import CreateReport from '../UserProfile/CreateReport';
import { Conversations } from '../../../api/conversation/Conversations';
import Conversation from '../Messages/Conversation';

/** Displays clickable markers placed at users' locations
 *  Shows user information when clicked */
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
    const conversations = this.props.conversations.filter((conversation) => (conversation.users.some((user) => (user === selectedUser.owner)))).filter((conversation) => (conversation.users.length === 2));
    let messageButton;
    let reportButton;
    if (selectedUser.owner === currentUser.owner) {
      messageButton = <></>;
      reportButton = <></>;
    } else {
      messageButton = <Conversation currentUser={currentUser} conversations={conversations} selectedUser={selectedUser}/>;
      reportButton = <CreateReport reportedUser={selectedUser.owner} conversations={this.props.conversations} currentUser={currentUser.owner}/>;
    }
    return (
      <div width={9}>
        <MapPinUserInfo user={selectedUser}/>
        <MapPinSchedule trips={selectedUser.trips}/>
        <Grid columns={2}>
          <GridColumn textAlign='left'>
            {reportButton}
          </GridColumn>
          <GridColumn textAlign='right'>
            {messageButton}
          </GridColumn>
        </Grid>
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
