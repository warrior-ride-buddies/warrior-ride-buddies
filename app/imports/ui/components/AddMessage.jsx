import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Conversations } from '../../api/conversation/Conversations';

const messageSchema = new SimpleSchema({
  message: String,
  from: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(messageSchema);

/** Renders the Page for adding a document. */
class AddMessage extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { message, from, createdAt } = data;
    const messages = this.props.conversation.messages;
    messages.push({ message: message, from: from, createdAt: createdAt });
    Conversations.collection.update({ _id: this.props.conversation._id }, { $set: { messages: messages } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <TextField label="Send a message." name='message' autoComplete="off"/>
          <SubmitField value='Send'/>
          <ErrorsField/>
          <HiddenField name='from' value={this.props.from}/>
          <HiddenField name='createdAt' value={new Date()}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddMessage.propTypes = {
  conversation: PropTypes.object.isRequired,
  from: PropTypes.string.isRequired,
};

export default AddMessage;
