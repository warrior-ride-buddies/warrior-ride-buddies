import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Modal, Header, Form, TextArea } from 'semantic-ui-react';
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
    const createdBy = this.props.currentUser;
    const reportedUser = this.props.reportedUser;
    const report = this.state.text;
    const createdAt = new Date();
    Reports.collection.insert({ createdBy, reportedUser, report, createdAt });
    this.setOpen(false);
  }

  render() {
    return (
      <Modal
        onClose={() => this.setOpen(false)}
        onOpen={() => this.setOpen(true)}
        open={this.state.open}
        trigger={<Button circular icon='exclamation'></Button>}
      >
        <Modal.Header>Submit a report</Modal.Header>
        <Modal.Content>
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
};

const CreateReportContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(CreateReport);

export default CreateReportContainer;
