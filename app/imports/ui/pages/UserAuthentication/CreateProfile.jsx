import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Users } from '../../../api/user/User';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  userType: String,
  homeLocation: String,
  lat: Number,
  lng: Number,
  carMake: String,
  carModel: String,
  carColor: String,
  carPlate: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, userType, homeLocation, lat, lng, carMake, carModel, carColor, carPlate } = data;
    const position = { lat: lat, lng: lng };
    const trips = [{ day: 5, arrivalTime: 600, departureTime: 960, userType: 'driver' }];
    const owner = Meteor.user().username;
    Users.collection.insert({ firstName, lastName, userType, homeLocation, position, trips, carMake, carModel, carColor, carPlate, owner },
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
          <Header as="h2" textAlign="center">Add Stuff</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <TextField name='userType'/>
              <TextField name='homeLocation'/>
              <TextField name='lat'/>
              <TextField name='lng'/>
              <TextField name='carMake'/>
              <TextField name='carModel'/>
              <TextField name='carColor'/>
              <TextField name='carPlate'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateProfile;