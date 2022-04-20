import React from 'react';
import { Card, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Note from './Note';
import AddMessage from './AddMessage';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Conversation extends React.Component {
  render() {
    const conversation = this.props.conversation;
    return (
      <Card centered>
        <Card.Content>
          <Card.Header>{contact.firstName} {contact.lastName}</Card.Header>
          <Card.Meta>{contact.address}</Card.Meta>
          <Card.Description>
            {contact.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Link to={`/edit/${this.props.contact._id}`}>Edit</Link>
        </Card.Content>
        <Card.Content extra>
          <Feed>
            {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
          </Feed>
        </Card.Content>
        <Card.Content extra>
          <AddMessage owner={this.props.contact.owner} contactId={this.props.contact._id}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Conversation.propTypes = {
  conversation: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Conversation);
