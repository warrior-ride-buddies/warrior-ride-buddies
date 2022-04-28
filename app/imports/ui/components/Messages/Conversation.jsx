import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Feed, Button, List, Modal, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Message from './Message';
import AddMessage from './AddMessage';
import { Conversations } from '../../../api/conversation/Conversations';
import { Users } from '../../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Conversation extends React.Component {
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
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button color='teal' content='Message' icon='send' labelPosition='right'/>}
      >
        <Modal.Header><List.Content>{otherUsers.map((user, index) => <List.Item key={index}><Image src={user.image} avatar/>{`${user.firstName} ${user.lastName}`}</List.Item>)}</List.Content></Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Feed>
              {conversation.messages.map((message, index) => <Message key={index} message={message}/>)}
            </Feed>
            <AddMessage conversation={conversation} from={currentUser}/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
Conversation.propTypes = {
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
})(Conversation);
