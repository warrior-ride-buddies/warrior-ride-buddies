import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';

class ListReports extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  renderWait() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  render() {
    return (
      <Container>
        <Header as="h2" textAlign="center" id="listreports-page">Review Reports</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>user</Table.HeaderCell>
              <Table.HeaderCell>reported by</Table.HeaderCell>
              <Table.HeaderCell>issue</Table.HeaderCell>
              <Table.HeaderCell>date</Table.HeaderCell>
              <Table.HeaderCell>reported message</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>jappleseed@hawaii.edu</Table.Cell>
              <Table.Cell>jdeer@hawaii.edu</Table.Cell>
              <Table.Cell>Broke TOS</Table.Cell>
              <Table.Cell>Mar 13, 2022</Table.Cell>
              <Table.Cell><a>message link/modal</a></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListReports.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(ListReports);
