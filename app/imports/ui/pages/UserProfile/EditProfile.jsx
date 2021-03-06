import React from 'react';
import { Grid, Loader, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
// eslint-disable-next-line no-unused-vars
import uploadcare from 'uploadcare-widget/uploadcare.lang.en.min.js';
import { Autocomplete } from '@react-google-maps/api';
import { Users } from '../../../api/user/User';
import EditProfileImage from '../../components/UserProfile/EditProfileImage';

const bridge = new SimpleSchema2Bridge(Users.schema);

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {
  state = { address: this.props.user.address, position: this.props.user.position }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }
  // On successful submit, insert the data.

  handleAddress = () => {
    // eslint-disable-next-line no-undef
    const address = document.getElementsByName('address')[0].value;
    this.setState({ address: address });
  };

  submit(data) {
    // eslint-disable-next-line no-undef
    const image = document.getElementsByName('profilePicture')[0].value;
    const address = this.state.address;
    const position = this.state.position;
    const { firstName, lastName, userType, trips, carMake, carModel, carColor, carPlate } = data;
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(
        ({ lat, lng }) => {
          const latDif = 0.002 - 0.004 * Math.random();
          const lngDif = 0.002 - 0.004 * Math.random();
          position.lat = lat + latDif;
          position.lng = lng + lngDif;
          if (image !== '') {
            Users.collection.update(this.props.user._id, { $set: { firstName, lastName, userType, address, position, trips, carMake, carModel, carColor, carPlate, image } }, (error) => (error ?
              swal('Error', error.message, 'error') :
              swal('Success', 'Item updated successfully', 'success')));
          } else {
            Users.collection.update(this.props.user._id, { $set: { firstName, lastName, userType, address, position, trips, carMake, carModel, carColor, carPlate } }, (error) => (error ?
              swal('Error', error.message, 'error') :
              swal('Success', 'Item updated successfully', 'success')));
          }
        },
      ).catch(() => swal('Error', 'Please enter a valid address', 'error'));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Row>
          <div className='edit-profile-image'>
            <EditProfileImage user={this.props.user}/>
          </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.user}>
              <Segment>
                <TextField id="edit-profile-firstName" name='firstName'/>
                <TextField id="edit-profile-lastName" name='lastName'/>
                <Autocomplete onPlaceChanged={this.handleAddress}>
                  <Form.Input
                    label="Address"
                    type="textField"
                    id="edit-profile-address"
                    name='address'
                    value={this.state.address}
                    onChange={this.handleAddress}/>
                </Autocomplete>
                <HiddenField id="edit-profile-trips" name='trips' />
                <TextField id="edit-profile-carMake" name='carMake' />
                <TextField id="edit-profile-carModel" name='carModel' />
                <TextField id="edit-profile-carColor" name='carColor' />
                <TextField id="edit-profile-carPlate" name='carPlate' />
                <HiddenField id="edit-profile-owner" name='owner' />
                <SubmitField id="edit-profile-submit" value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  user: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const user = Users.collection.findOne({ owner: Meteor.user().username });
  return {
    user,
    ready,
  };
})(EditProfile);
