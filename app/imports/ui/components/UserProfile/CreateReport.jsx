import React from 'react';
import { Button, Modal, Form, TextArea } from 'semantic-ui-react';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CreateReport extends React.Component {
  render() {
    return (
      <Modal
        trigger={<Button circular icon='exclamation'></Button>}
        header='Report'
        content={
          <Form>
            <TextArea placeholder='Tell us more' />
          </Form>}
        actions={['Cancel', { key: 'submit', content: 'Submit Report', positive: true }]}
      />
    );
  }
}

export default CreateReport;
