import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ViewConversation from './ViewConversation';

/** Renders a report as a Table row */
class Report extends React.Component {
  render() {
    const report = this.props.report;
    const users = this.props.users;
    const currentUser = users.filter(user => (user.owner === Meteor.user().username))[0];
    return (
      <Table.Row>
        <Table.Cell>{report.reportedUser}</Table.Cell>
        <Table.Cell>{report.createdBy}</Table.Cell>
        <Table.Cell>{report.report}</Table.Cell>
        <Table.Cell>{report.createdAt}</Table.Cell>
        <Table.Cell>{this.props.conversations.map((conversation, index) => (<ViewConversation key={index} conversation={conversation} users={users} currentUser={currentUser}/>))}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
Report.propTypes = {
  report: PropTypes.shape({
    createdBy: PropTypes.string,
    reportedUser: PropTypes.string,
    report: PropTypes.string,
    createdAt: PropTypes.string,
    conversationIds: PropTypes.array,
  }).isRequired,
  conversations: PropTypes.array.isRequired,
  users: PropTypes.array,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default Report;
