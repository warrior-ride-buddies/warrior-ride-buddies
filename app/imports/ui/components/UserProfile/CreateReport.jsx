import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Reports } from '../../../api/report/Reports';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CreateReport extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      text: '',
    };
  }

  changeText = (e) => {
    this.setState({ text: e.target.value });
  }

  setOpen(value) {
    this.setState({ open: value });
  }

  submitReport() {
    const reportedUser = this.props.reportedUser;
    const conversationIds = this.props.conversations.filter((conversation) => (conversation.users.some((user) => (user === reportedUser)))).map((conversation) => (conversation._id));
    const createdBy = this.props.currentUser;
    const report = this.state.text;
    const createdAt = new Date();
    Reports.collection.insert({ createdBy, reportedUser, report, createdAt, conversationIds },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Report submitted for review', 'success');
        }
      });
    this.setOpen(false);
  }

  render() {
    return (
      <Modal
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        open={this.state.open}
        trigger={<Button circular icon='exclamation'/>}
      >
        <Modal.Header>Submit a report</Modal.Header>
        <Modal.Content>
          (Your conversations with this user will automatically be submitted for review)
          <Form>
            <Form.TextArea onChange={this.changeText} value={this.state.text}/>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => this.setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Submit Report"
            labelPosition='right'
            icon='fighter jet'
            onClick={() => this.submitReport()}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

CreateReport.propTypes = {
  currentUser: PropTypes.string.isRequired,
  reportedUser: PropTypes.string.isRequired,
  conversations: PropTypes.array.isRequired,
};

export default CreateReport;
