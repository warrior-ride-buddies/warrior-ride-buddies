import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ViewConversation from './ViewConversation';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Report extends React.Component {
  render() {
    const report = this.props.report;
    return (
      <Table.Row>
        <Table.Cell>{report.reportedUser}</Table.Cell>
        <Table.Cell>{report.createdBy}</Table.Cell>
        <Table.Cell>{report.report}</Table.Cell>
        <Table.Cell>{report.createdAt}</Table.Cell>
        <Table.Cell>{this.props.conversations.map((conversation, index) => (<ViewConversation key={index} conversation={conversation}/>))}</Table.Cell>
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
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Report);
