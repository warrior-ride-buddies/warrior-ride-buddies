import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../../api/user/User';
import { Reports } from '../../../api/report/Reports';
import { Conversations } from '../../../api/conversation/Conversations';
import Report from '../../components/Admin/Report';

class ListReports extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" id="listreports-page">Review Reports</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Reported by</Table.HeaderCell>
              <Table.HeaderCell>Issue</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Conversations involving both parties</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.reports.map((report, index) => (<Report key={index} report={report} conversations={this.props.conversations.filter(conversation => report.conversationIds.some((id) => (id === conversation._id)))}/>))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListReports.propTypes = {
  users: PropTypes.array.isRequired,
  reports: PropTypes.array.isRequired,
  conversations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.adminPublicationName);
  const subscription2 = Meteor.subscribe(Reports.adminPublicationName);
  const subscription3 = Meteor.subscribe(Conversations.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready() && subscription3.ready();
  // Get the Stuff documents
  const users = Users.collection.find({}).fetch();
  const reports = Reports.collection.find({}).fetch();
  const conversations = Conversations.collection.find({}).fetch();
  return {
    conversations,
    reports,
    users,
    ready,
  };
})(ListReports);
