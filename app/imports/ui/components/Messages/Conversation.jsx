import React from 'react';
import { Container, Feed, Image, List, Modal } from 'semantic-ui-react';
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
    const something = conversation.users.filter(user => (user.username !== currentUser));
    return (
      <Container style={{ paddingBottom: '10px' }} >
        <div style={{ backgroundColor: 'grey', borderRadius: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '5px' }}>
          <Modal style={{ overflow: 'auto', maxHeight: '40em' }}
            onClose={this.onClose}
            onOpen={this.onOpen}
            open={this.isOpen}
            trigger={<List.Item>
              <List.Content>
                <Image src={something[0].image} avatar />
                <List.Header as='a' style={{ color: 'black' }}> {something[0].username} </List.Header>
                {/* <List.Description as='a'>Updated 10 mins ago</List.Description> */}
              </List.Content>
            </List.Item>}
          >
            <Modal.Header> {something[0].username} </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Feed>
                  {this.props.conversation.messages.map((message, index) => <Message key={index} message={message}/>)}
                </Feed>
                <AddMessage conversation={conversation} from={currentUser}/>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>
      </Container>
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
