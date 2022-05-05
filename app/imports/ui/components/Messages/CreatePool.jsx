import React from 'react';
import { Button, Modal, Header } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Conversations } from '../../../api/conversation/Conversations';
import ConversationContent from './ConversationContent';

/** This component is a Modal that will display ConversationContent
 *  Appears as a blue message button
 *  Meant to be used on MapPins and Profiles */
class CreatePool extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false, // Hides or shows the Conversation
    };
  }

  onClose = () => {
    const conversations = this.props.conversations;
    if (conversations[conversations.length - 1].messages.length === 0) {
      Conversations.collection.remove({ _id: conversations[conversations.length - 1]._id });
      console.log('remove convo');
    }
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
    if (this.props.conversations.some((conversation) => (this.props.selectedUsers.every((user) => (conversation.users.some((cUser) => (cUser === user)))) && conversation.users.length === this.props.selectedUsers.length + 1))) {
      console.log('convo alread exists');
    } else if (this.props.selectedUsers.length === 0) {
      console.log('no users selected');
    } else {
      console.log('try to create convo');
      const messages = [];
      const currentUser = this.props.currentUser.owner;
      const selectedUsers = this.props.selectedUsers;
      const users = selectedUsers.concat(currentUser);
      Conversations.collection.insert({ messages, users });
    }
  };

  render() {
    console.log('render function');
    return (this.props.conversations.some((conversation) => (this.props.selectedUsers.every((user) => (conversation.users.some((cUser) => (cUser === user)))) && conversation.users.length === this.props.selectedUsers.length + 1)))
      ? this.renderPage() : <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button color='green' content='Create Pool!' icon='users' labelPosition='right'/>}
      >
        <Header>No users selected</Header>
      </Modal>;
  }

  renderPage() {
    console.log('render page function');
    const conversation = this.props.conversations.filter((convo) => (this.props.selectedUsers.every((user) => (convo.users.some((cUser) => (cUser === user)))) && convo.users.length === this.props.selectedUsers.length + 1))[0];
    const currentUser = this.props.currentUser;
    const users = this.props.users.filter((user) => (conversation.users.some((cUser) => (cUser === user.owner))));
    console.log(conversation);
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button color='green' content='Create Pool!' icon='users' labelPosition='right'/>}
      >
        <ConversationContent currentUser={currentUser} conversation={conversation} users={users}/>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
CreatePool.propTypes = {
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
  selectedUsers: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default (CreatePool);
