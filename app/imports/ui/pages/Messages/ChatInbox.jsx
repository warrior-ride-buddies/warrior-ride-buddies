import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../../../api/contact/Contacts';
import ChatInboxItem from '../../components/Messages/ChatInboxItem';

/** Renders the Page for adding a document. */
class ChatInbox extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : '';
  }

  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Inbox</Header>
          <Segment>
            <List divided relaxed>
              {this.props.contacts.map((contact) => <ChatInboxItem key={contact._id} contact={contact}/>)}
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
ChatInbox.propTypes = {
  contacts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const ready = subscription.ready();
  const contacts = Contacts.collection.find({}).fetch();
  console.log(contacts);
  // Determine if the subscription is ready
  // Get the Stuff documents
  // const userEmail = Meteor.user().username;
  // console.log(userEmail);
  return {
    contacts,
    ready,
  };
})(ChatInbox);