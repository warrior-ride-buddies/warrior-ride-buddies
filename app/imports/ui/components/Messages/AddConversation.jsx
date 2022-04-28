import React from 'react';
import { Button, Modal, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Conversations } from '../../../api/conversation/Conversations';

const messageSchema = new SimpleSchema({
  message: String,
  from: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(messageSchema);

/** Renders the Page for adding a document. */
class AddConversation extends React.Component {

  constructor() {
    super();
    this.state = {
      isOpen: false, // Hides or shows the InfoWindow
    };
  }

  onClose = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  onOpen = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }
  };

  // On submit, insert the data.
  submit(data, formRef) {
    let bool = false;
    this.props.existConvo.forEach((convo) => {
      const users = convo.users.map(user => user.username);
      if (users.includes(this.props.receiver.owner)) {
        bool = true;
      }
    });
    if (bool === false) {
      const { message, from, createdAt } = data;
      const messages = [{ message: message, from: from, createdAt: createdAt }];
      const users = [{ username: this.props.sender.owner, image: 'images/personIcon.png' }, { username: this.props.receiver.owner, image: 'images/kobey.jpeg' }];
      Conversations.collection.insert({ messages, users },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'conversation added successfully', 'success');
            formRef.reset();
          }
        });
    } else if (bool === true) {
      swal('Error', 'This conversation already exists or is an invalid user', 'error');
    }
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Modal
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button> Start Conversation </Button>}
      >
        <Modal.Content>
          <Modal.Description>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField label="Send a message." name='message' autoComplete="off"/>
                <SubmitField value='Send'/>
                <ErrorsField/>
                <HiddenField name='from' value={this.props.sender.owner}/>
                <HiddenField name='createdAt' value={new Date()}/>
              </Segment>
            </AutoForm>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

AddConversation.propTypes = {
  sender: PropTypes.object.isRequired,
  receiver: PropTypes.object.isRequired,
  existConvo: PropTypes.array.isRequired,
};

export default AddConversation;
