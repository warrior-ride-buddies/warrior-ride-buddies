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
    if (this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }

  };

  render() {
    const conversation = this.props.conversation;
    const currentUser = this.props.currentUser;
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
              {this.props.conversation.messages.map((message, index) => <Message key={index} message={message}/>)}
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
  currentUser: PropTypes.string.isRequired,
  conversation: PropTypes.object,
  selectedUser: PropTypes.object,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default Conversation;
