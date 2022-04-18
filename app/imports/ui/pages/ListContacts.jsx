import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Contact from '../components/Contact';
import { Contacts } from '../../api/contact/Contacts';
import { Text } from '../../api/message/Text';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListContacts extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Contacts</Header>
        <Card.Group centered>
          {this.props.contacts.map((contact, index) => <Contact
            key={index}
            contact={contact}
            text={this.props.text.filter(text => (text.contactId === contact._id))}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  text: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const subscription2 = Meteor.subscribe(Text.userPublicationName);
  // Determine if the subscription is ready
  // Get the Stuff documents
  return {
    contacts: Contacts.collection.find({}).fetch(),
    text: Text.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListContacts);
