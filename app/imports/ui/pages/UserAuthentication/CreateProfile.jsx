import React from 'react';
import { Grid, Header, Select, Form, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import ApiKeys from '../../../../ApiKeys.json';
import { Users } from '../../../api/user/User';

const userTypes = [
  {
    key: 'r',
    text: 'Rider',
    value: 'Rider',
  },
  {
    key: 'd',
    text: 'Driver',
    value: 'Driver',
  },
  {
    key: 'b',
    text: 'Both',
    value: 'Both',
  },
];

class CreateProfile extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    image: '',
    userType: 'Driver',
    address: '',
    position: { lat: '', lng: '' },
    carMake: '',
    carModel: '',
    carColor: '',
    carPlate: '',
    redirectToReferer: false,
    error: '',
    showCarFields: true,
  }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

  handleAddress = () => {
    const address = document.getElementsByName('address')[0].value;
    this.setState({ address: address });
  };

  changeUserType = (e, { value }) => {
    this.setState({ userType: value });
    if (value === 'Rider') {
      this.setState({ showCarFields: false });
    } else {
      this.setState({ showCarFields: true });
    }
  }

  // On submit, insert the data.
  submit = () => {
    // eslint-disable-next-line no-undef
    const address = this.state.address;
    let image = document.getElementsByName('profilePicture')[0].value;
    const { firstName, lastName, userType, carMake, carModel, carColor, carPlate } = this.state;
    const { position } = this.state;
    const trips = [];
    const owner = Meteor.user().username;
    if (image === '') {
      image = './images/MissingProfileImage.png';
    }
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(
        ({ lat, lng }) => {
          const latDif = 0.002 - 0.004 * Math.random();
          const lngDif = 0.002 - 0.004 * Math.random();
          position.lat = lat + latDif;
          position.lng = lng + lngDif;
          Users.collection.insert({ firstName, lastName, image, userType, address, position, trips, carMake, carModel, carColor, carPlate, owner },
            (error) => {
              if (error) {
                swal('Error', error.message, 'error');
              } else {
                this.setState({
                  firstName: '',
                  lastName: '',
                  image: '',
                  userType: '',
                  address: '',
                  lat: '',
                  lng: '',
                  carMake: '',
                  carModel: '',
                  carColor: '',
                  carPlate: '',
                  redirectToReferer: true,
                  error: '',
                });
              }
            });
        },
      ).catch(() => swal('Error', 'Please enter a valid address', 'error'));
  }

  render() {
    const { firstName, lastName, userType, address, carMake, carModel, carColor, carPlate } = this.state;
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={'/main'}/>;
    }
    let carFields;
    if (this.state.showCarFields) {
      carFields = <Form.Group widths='equal'>
        <Form.Input
          fluid
          id="create-profile-carMake"
          name='carMake'
          label='Make'
          placeholder='Make'
          value={carMake}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          id="create-profile-carModel"
          name='carModel'
          label='Model'
          placeholder='Model'
          value={carModel}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          id="create-profile-carColor"
          name='carColor'
          label='Color'
          placeholder='Color'
          value={carColor}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          id="create-profile-carPlate"
          name='carPlate'
          label='License Plate'
          placeholder='License Plate'
          value={carPlate}
          onChange={this.handleChange}
        />
      </Form.Group>;
    } else {
      carFields = <></>;
    }

    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Create Profile</Header>
          <Form onSubmit={this.submit}>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                id="create-profile-firstName"
                name='firstName'
                label='First name'
                placeholder='First name'
                value={firstName}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                id="create-profile-lastName"
                name='lastName'
                label='Last name'
                placeholder='Last name'
                value={lastName}
                onChange={this.handleChange}
              />
              <Form.Field
                control={Select}
                fluid
                label="User Type"
                id="create-profile-userType"
                options={userTypes}
                name='userType'
                value={userType}
                onChange={this.changeUserType}
              />
            </Form.Group>
            <Autocomplete onPlaceChanged={this.handleAddress}>
              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  id="create-profile-address"
                  name='address'
                  label='Address'
                  placeholder='Address'
                  value={address}
                  onChange={this.handleAddress}
                />
              </Form.Group>
            </Autocomplete>
            {carFields}
            <input
              type="hidden"
              id="uploadcare-uploader"
              role="uploadcare-uploader"
              data-public-key={ApiKeys.uploadcareKey}
              data-tabs="file camera url facebook gdrive gphotos"
              data-effects="crop, rotate"
              name="profilePicture"/>
            <Form.Field control={Button} id="create-profile-submit" value='Submit'>Submit</Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateProfile;
