import React from 'react';
import { Button, Feed, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Message from '../Messages/Message';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ViewConversation extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false, // Hides or shows the InfoWindow
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
    const users = conversation.users;
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button>View conversation</Button>}
      >
        <Modal.Header>{users.map((user, index) => <Modal.Content key={index}>{user.username}</Modal.Content>)}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Feed>
              {conversation.messages.map((message, index) => <Message key={index} message={message}/>)}
            </Feed>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
ViewConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default ViewConversation;
