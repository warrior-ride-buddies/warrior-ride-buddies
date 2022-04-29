import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Feed, Button, List, Modal, Image, Grid, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Message from './Message';
import AddMessage from './AddMessage';
import { Conversations } from '../../../api/conversation/Conversations';
import { Users } from '../../../api/user/User';
import Parse from '../../../api/parse/parse';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class InboxItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false, // Hides or shows the Conversation
    };
  }

  onClose = () => {
    if (this.props.conversations[0].messages.length === 0) {
      Conversations.collection.remove({ _id: this.props.conversations[0]._id });
    }
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  onOpen = () => {
    if (this.props.conversations.length === 0) {
      const messages = [];
      const currentUser = this.props.currentUser;
      const selectedUser = this.props.selectedUser;
      const users = [currentUser.owner, selectedUser.owner];
      Conversations.collection.insert({ messages, users });
    }
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
    return (this.props.conversations.length !== 0 && this.props.ready) ? this.renderPage() : <Modal
      onClose={this.onClose}
      onOpen={this.onOpen}
      open={this.isOpen}
      trigger={<Button color='teal' content='Message' icon='send' labelPosition='right'/>}
    />;
  }

  renderPage() {
    const conversation = this.props.conversations[0];
    const currentUser = this.props.currentUser.owner;
    const users = this.props.users.filter((user) => (conversation.users.some((cUser) => (cUser === user.owner))));
    const otherUsers = users.filter(user => (user.owner !== currentUser));
    const recentMessage = conversation.messages[conversation.messages.length - 1];
    const recentSender = users.filter(user => (user.owner === recentMessage.from))[0];
    const nameOfSenderShown = (recentSender.owner === currentUser) ? 'Me' : recentSender.firstName;
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={
          <Container textAlign={'center'}>
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
        <Modal.Header><List.Content>{otherUsers.map((user, index) => <List.Item key={index}><Image src={user.image} avatar/>{`${user.firstName} ${user.lastName}`}</List.Item>)}</List.Content></Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Feed>
              {conversation.messages.map((message, index) => <Message key={index} message={message} users={users}/>)}
            </Feed>
            <AddMessage conversation={conversation} from={currentUser}/>
          </Modal.Description>
        </Modal.Content>
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
