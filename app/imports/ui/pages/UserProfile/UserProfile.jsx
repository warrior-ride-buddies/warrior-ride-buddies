import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Image, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../../api/user/User';
import { Conversations } from '../../../api/conversation/Conversations';
import UserInfo from '../../components/UserProfile/UserInfo';
import Schedule from '../../components/UserProfile/Schedule';
import ScheduleEditable from '../../components/UserProfile/ScheduleEditable';
import Conversation from '../../components/Messages/Conversation';
import AddTrip from '../../components/UserProfile/AddTrip';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const selectedUser = this.props.selectedUser;
    const currentUser = this.props.currentUser;
    let messageButton;
    let createTripButton;
    if (selectedUser.owner === currentUser.owner) {
      messageButton = <></>;
      createTripButton = <AddTrip currentUser={currentUser}></AddTrip>;
    } else {
      messageButton = <Conversation currentUser={currentUser} conversations={this.props.conversation} selectedUser={selectedUser}/>;
      createTripButton = <></>;
    }
    return (
      <Grid style={{ margin: '20px' }} id={'userprofile-page'}>
        <Grid.Column width={4} textAlign='center'>
          <div style={{ height: '750px', backgroundColor: 'grey', borderRadius: '20px' }}>
            <Image src={selectedUser.image} style={{ padding: '30px' }} circular/>
          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <div style={{ height: '750px', paddingTop: '30px' }}>
            <UserInfo key={selectedUser._id} user={selectedUser} />
            <div className='accent-block' style={{ borderRadius: '2px', marginBottom: '10px', marginTop: '20px', opacity: '0.95', height: '1px', padding: '4px' }}></div>
            <Header as='h2' textAlign='center' style={{ paddingTop: '20px' }}>Schedule</Header>
            {selectedUser.owner === currentUser.owner ? <ScheduleEditable trips={selectedUser.trips} user={currentUser}/> : <Schedule trips={selectedUser.trips}/>}
            {messageButton}
            {createTripButton}
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
UserProfile.propTypes = {

  // availability: PropTypes.shape({
  //   monday: PropTypes.array,
  //   tuesday: PropTypes.array,
  //   wednesday: PropTypes.array,
  //   thursday: PropTypes.array,
  //   friday: PropTypes.array,
  //   _id: PropTypes.array,
  // }).isRequired,
  conversation: PropTypes.array.isRequired,
  selectedUser: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const email = match.params.owner;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const subscription2 = Meteor.subscribe(Conversations.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const selectedUser = Users.collection.findOne({ owner: email });
  const currentUser = Meteor.user() !== undefined ? Users.collection.findOne({ owner: Meteor.user().username }) : '';
  const conversations = Conversations.collection.find({}).fetch();
  const conversation = conversations.filter((convo => (convo.users.some(user => (user === selectedUser.owner)))));
  return {
    conversation,
    selectedUser,
    currentUser,
    ready,
  };
})(UserProfile);
