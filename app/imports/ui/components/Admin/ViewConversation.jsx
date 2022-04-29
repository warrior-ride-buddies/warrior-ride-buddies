import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ConversationContent from '../Messages/ConversationContent';

/** Displays ConversationContent as read only
 *  Appears as a grey button
 *  Meant to be used by admin on Reports */
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
    const users = this.props.users.filter((user) => (conversation.users.some(cUser => (cUser === user.owner))));
    const currentUser = this.props.currentUser;
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button>View conversation</Button>}
      >
        <ConversationContent currentUser={currentUser} conversation={conversation} users={users} readOnly={true}/>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
ViewConversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default ViewConversation;
