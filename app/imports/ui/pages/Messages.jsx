import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  message: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Messages extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert({ name, quantity, condition, owner },
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
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Messages</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
            <Segment>
              <div className="ui minimal comments">
                <div className="comment">
                  <a className="avatar">
                    <img src="/images/avatar/small/elliot.jpg"/>
                  </a>
                  <div className="content">
                    <a className="author">Elliot Fu</a>
                    <div className="metadata">
                      <span className="date">Yesterday at 12:30AM</span>
                    </div>
                    <div className="text">
                      <p>This has been very useful for my research. Thanks as well!</p>
                    </div>
                    <div className="actions">
                      <a className="reply">Reply</a>
                    </div>
                  </div>
                  <form className="ui reply form">
                    <div className="field">
                      <textarea></textarea>
                    </div>
                    <div className="ui blue labeled submit icon button">
                      <i className="icon edit"></i> Add Reply
                    </div>
                  </form>
                </div>
              </div>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Messages;
