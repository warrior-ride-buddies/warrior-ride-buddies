import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Conversations } from '../../../api/conversation/Conversations';
import { Users } from '../../../api/user/User';
import ConversationContent from './ConversationContent';

/** This component is a Modal that will display ConversationContent
 *  Appears as a blue message button
 *  Meant to be used on MapPins and Profiles */
class Conversation extends React.Component {
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
    const currentUser = this.props.currentUser;
    const users = this.props.users.filter((user) => (conversation.users.some((cUser) => (cUser === user.owner))));
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button color='teal' content='Message' icon='send' labelPosition='right'/>}
      >
        <ConversationContent currentUser={currentUser} conversation={conversation} users={users}/>
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
