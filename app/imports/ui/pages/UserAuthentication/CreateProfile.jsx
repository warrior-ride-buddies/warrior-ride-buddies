import React from 'react';
import { Grid, Segment, Header, GridRow, GridColumn, Container, Select, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Redirect } from 'react-router-dom';
import ApiKeys from '../../../../ApiKeys.json';
import { Users } from '../../../api/user/User';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  image: { type: String, optional: true },
  userType: String,
  address: String,
  lat: Number,
  lng: Number,
  carMake: { type: String, optional: true },
  carModel: { type: String, optional: true },
  carColor: { type: String, optional: true },
  carPlate: { type: String, optional: true },
});

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

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      redirectToReferer: false,
      userType: 'Rider',
      showCarFields: false,
    };
  }

  changeUserType = (e, { value }) => {
    this.setState({ userType: value });
    if (value === 'Rider') {
      this.setState({ showCarFields: false });
    } else {
      this.setState({ showCarFields: true });
    }
  }

  // On submit, insert the data.
  submit(data, formRef) {
    let image = document.getElementsByName('profilePicture')[0].value;
    const { firstName, lastName, userType, address, lat, lng, carMake, carModel, carColor, carPlate } = data;
    const position = { lat: lat, lng: lng };
    const trips = [];
    const owner = Meteor.user().username;
    if (image !== '') {
      Users.collection.insert({ firstName, lastName, image, userType, address, position, trips, carMake, carModel, carColor, carPlate, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            formRef.reset();
            this.setState({ error: '', redirectToReferer: true });
          }
        });
    } else {
      image = './images/MissingProfileImage.png';
      Users.collection.insert({ firstName, lastName, image, userType, address, position, trips, carMake, carModel, carColor, carPlate, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            formRef.reset();
            this.setState({ error: '', redirectToReferer: true });
          }
        });
    }

  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={'/main'}/>;
    }
    let fRef = null;
    let carFields;
    if (this.state.showCarFields) {
      carFields = <Container>
        <TextField id="create-profile-carMake" name='carMake'/>
        <TextField id="create-profile-carModel" name='carModel'/>
        <TextField id="create-profile-carColor" name='carColor'/>
        <TextField id="create-profile-carPlate" name='carPlate'/>
      </Container>;
    } else {
      carFields = <></>;
    }
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Create Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Grid>
                <GridRow columns={2}>
                  <GridColumn><TextField id="create-profile-firstName" name='firstName'/></GridColumn>
                  <GridColumn><TextField id="create-profile-lastName" name='lastName'/></GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn>
                    <TextField id="create-profile-address" name='address'/>
                  </GridColumn>
                </GridRow>
                <GridRow columns={3}>
                  <GridColumn><TextField id="create-profile-lat" name='lat'/></GridColumn>
                  <GridColumn><TextField id="create-profile-lng" name='lng'/></GridColumn>
                  <GridColumn>
                    <Form.Field
                      control={Select}
                      fluid
                      label="User Type"
                      id="create-profile-userType"
                      options={userTypes}
                      name='userType'
                      onChange={this.changeUserType}
                      value={this.state.userType}
                    />
                  </GridColumn>
                </GridRow>
              </Grid>
              {carFields}
              <input
                type="hidden"
                id="uploadcare-uploader"
                role="uploadcare-uploader"
                data-public-key={ApiKeys.uploadcareKey}
                data-tabs="file camera url facebook gdrive gphotos"
                data-effects="crop, rotate"
                name="profilePicture"/><SubmitField id="create-profile-submit" value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateProfile;
