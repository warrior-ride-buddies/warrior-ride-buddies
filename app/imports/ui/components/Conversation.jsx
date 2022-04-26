import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Message from './Message';
import AddMessage from './AddMessage';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Conversation extends React.Component {
  render() {
    const conversation = this.props.conversation;
    const currentUser = this.props.currentUser;
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{conversation.usernames.filter(user => (user !== currentUser))}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Feed>
            {this.props.conversation.messages.map((message, index) => <Message key={index} message={message}/>)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <AddMessage conversation={conversation} from={currentUser}/>
        </Card.Content>
      </Card>
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