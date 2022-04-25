import React from 'react';
import { Feed, Modal, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import AddMessage from './AddMessage';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Conversation extends React.Component {
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
    const currentUser = this.props.currentUser;
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<List.Item>
          <List.Icon name='github' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'> {conversation.usernames.filter(user => (user !== currentUser))} </List.Header>
            {/* <List.Description as='a'>Updated 10 mins ago</List.Description> */}
          </List.Content>
        </List.Item>}
      >
        <Modal.Header>{conversation.usernames.filter(user => (user !== currentUser))}</Modal.Header>
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
  conversation: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Conversation);
