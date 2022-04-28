import React from 'react';
import { Feed, Button, List, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Message from './Message';
import AddMessage from './AddMessage';
import { Conversations } from '../../../api/conversation/Conversations';

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
      const users = [{ username: currentUser.owner, firstName: currentUser.firstName, lastName: currentUser.lastName, image: 'images/personIcon.png' },
        { username: selectedUser.owner, firstName: selectedUser.firstName, lastName: selectedUser.lastName, image: 'images/kobey.jpeg' }];
      Conversations.collection.insert({ messages, users });
    }
    if (this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }

  };

  render() {
    return (this.props.conversations.length !== 0) ? this.renderPage() : <Modal
      onClose={this.onClose}
      onOpen={this.onOpen}
      open={this.isOpen}
      trigger={<Button color='teal' content='Message' icon='send' labelPosition='right'/>}
    />;
  }

  renderPage() {
    const conversation = this.props.conversations[0];
    const currentUser = this.props.currentUser.owner;
    const otherUsers = conversation.users.filter(user => (user.username !== currentUser));
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button color='teal' content='Message' icon='send' labelPosition='right'/>}
      >
        <Modal.Header><List.Content>{otherUsers.map((user, index) => <List.Item key={index}>{`${user.firstName} ${user.lastName}`}</List.Item>)}</List.Content></Modal.Header>
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
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default Conversation;
