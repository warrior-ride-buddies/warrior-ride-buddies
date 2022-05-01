import React from 'react';
import { Grid, Header, Select, Form, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
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
    userType: '',
    address: '',
    lat: '',
    lng: '',
    carMake: '',
    carModel: '',
    carColor: '',
    carPlate: '',
    redirectToReferer: false,
    error: '',
    showCarFields: false,
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

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
    let image = document.getElementsByName('profilePicture')[0].value;
    const { firstName, lastName, userType, address, lat, lng, carMake, carModel, carColor, carPlate } = this.state;
    console.log(userType);
    const position = { lat: lat, lng: lng };
    const trips = [];
    const owner = Meteor.user().username;
    if (image === '') {
      image = './images/MissingProfileImage.png';
    }
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
  }

  render() {
    const { firstName, lastName, userType, address, lat, lng, carMake, carModel, carColor, carPlate } = this.state;
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
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                id="create-profile-address"
                name='address'
                label='Address'
                placeholder='Address'
                value={address}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                id="create-profile-lat"
                name='lat'
                label='Latitude'
                placeholder='Latitude'
                value={lat}
                onChange={this.handleChange}
              />
              <Form.Input
                id="create-profile-lng"
                name='lng'
                label='Longitude'
                placeholder='Longitude'
                value={lng}
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
