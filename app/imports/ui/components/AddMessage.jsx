import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Messages } from '../../api/message/Messages';

const bridge = new SimpleSchema2Bridge(Messages.schema);

/** Renders the Page for adding a document. */
class AddMessage extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { message, owner, profileId, createdAt } = data;
    Messages.collection.insert({ message, profileId, createdAt, owner },
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
          <TextField label="Send a message." name='message'/>
          <SubmitField value='Send'/>
          <ErrorsField/>
          <HiddenField name='owner' value={this.props.owner}/>
          <HiddenField name='profileId' value={this.props.profileId}/>
          <HiddenField name='createdAt' value={new Date()}/>
        </Segment>
      </AutoForm>
    );
  }
}

AddMessage.propTypes = {
  owner: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
};

export default AddMessage;
