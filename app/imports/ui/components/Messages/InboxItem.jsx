import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Modal, Grid, Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Users } from '../../../api/user/User';
import Parse from '../../../api/parse/parse';
import ConversationContent from './ConversationContent';

/** This component is a modal displaying ConversationContent
 *  Appears as a clickable list item with peoples' names and the most recent message and time sent
 *  Meant to be used in Inbox */
class InboxItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false, // Hides or shows the Conversation
    };
  }

  onClose = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  onOpen = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }
  };

  convertTime(date) {
    const min = date.getHours() * 60 + date.getMinutes();
    return Parse.timeToString(min);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const conversation = this.props.conversations[0];
    const currentUser = this.props.currentUser;
    const users = this.props.users.filter((user) => (conversation.users.some((cUser) => (cUser === user.owner))));
    const otherUsers = users.filter(user => (user.owner !== currentUser.owner));
    const recentMessage = conversation.messages[conversation.messages.length - 1];
    const recentSender = users.filter(user => (user.owner === recentMessage.from))[0];
    const nameOfSenderShown = (recentSender.owner === currentUser.owner) ? 'Me' : recentSender.firstName;
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={
          <Container textAlign={'center'} style={{ marginBottom: '10px' }}>
            <Button basic className='ui fluid button'>
              <Grid columns={3}>
                <Grid.Column textAlign={'left'}>
                  {otherUsers.map((user) => (`${user.firstName} ${user.lastName}`))}
                </Grid.Column>
                <Grid.Column textAlign={'left'}>
                  {`${nameOfSenderShown}: "${recentMessage.message}"`}
                </Grid.Column>
                <Grid.Column>
                  {`${this.convertTime(conversation.messages[conversation.messages.length - 1].createdAt)}`}
                </Grid.Column>
              </Grid>
              <Container>
              </Container>
            </Button>
          </Container>
        }>
        <ConversationContent currentUser={currentUser} conversation={conversation} users={users}/>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
InboxItem.propTypes = {
  currentUser: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
  selectedUser: PropTypes.object,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(InboxItem);
