import React from 'react';
import { Feed, Segment, Grid, Image, Header, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Message from './Message';
import AddMessage from './AddMessage';

/** Displays messages and an addMessage field if readOnly = false */
class ConversationContent extends React.Component {

  render() {
    const conversation = this.props.conversation;
    const currentUser = this.props.currentUser;
    const users = this.props.users;
    const otherUsers = users.filter(user => (user.owner !== currentUser.owner));
    let addMessage;
    if (this.props.readOnly) {
      addMessage = <></>;
    } else {
      addMessage = <AddMessage conversation={conversation} from={currentUser.owner}/>;
    }
    return (
      <Container>
        <Segment inverted secondary>
          <Header><Grid columns='equal'>{otherUsers.map((user, index) => <Grid.Column key={index}>
            <Link to={`/profile/${user.owner}`} style={{ color: 'white' }}>
              <Image src={user.image} avatar/>{`${user.firstName} ${user.lastName}`}
            </Link>
          </Grid.Column>)}</Grid></Header>
        </Segment>
        <Feed>
          {conversation.messages.map((message, index) => <Message key={index} message={message} users={users}/>)}
        </Feed>
        {addMessage}
      </Container>
    );
  }
}

// Require a document to be passed to this component.
ConversationContent.propTypes = {
  currentUser: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  readOnly: PropTypes.bool,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default ConversationContent;
