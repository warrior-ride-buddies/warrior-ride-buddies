import React from 'react';
import { Grid, GridColumn, Header, Image, Table } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CreateReport from '../components/CreateReport';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (
      <Grid style={{ margin: '20px' }}>
        <Grid.Column width={4} textAlign='center'>
          <div style={{ height: '750px', backgroundColor: 'grey', borderRadius: '20px' }}>
            <Image src='./images/kobey.jpeg' style={{ padding: '30px' }} circular/>
          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <div style={{ height: '750px', paddingTop: '30px' }}>
            <Grid>
              <GridColumn width={8}>
                <Header as='h1'>Johnny Appleseed</Header>
                <p>Driver<br/>Waimalu, 96701</p>
              </GridColumn>
              <GridColumn width={8} textAlign='right'>
                <Header as='h3'>Car Details</Header>
                <p>Car Make: Lamborghini<br/>Car Model: Aventador<br/>Car Color: Green<br/>Car License Plate: 2S3XY</p>
              </GridColumn>
            </Grid>
            <Header as="h2" textAlign="center" style={{ paddingTop: '30px' }}>Availability</Header>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Day of the Week</Table.HeaderCell>
                  <Table.HeaderCell>UHM Arrival Time</Table.HeaderCell>
                  <Table.HeaderCell>UHM Departure Time</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Monday</Table.Cell>
                  <Table.Cell>10:00AM</Table.Cell>
                  <Table.Cell>10:00PM</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Tuesday</Table.Cell>
                  <Table.Cell>10:00AM</Table.Cell>
                  <Table.Cell>10:00PM</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Wednesday</Table.Cell>
                  <Table.Cell>10:00AM</Table.Cell>
                  <Table.Cell>10:00PM</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Thursday</Table.Cell>
                  <Table.Cell>10:00AM</Table.Cell>
                  <Table.Cell>10:00PM</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Friday</Table.Cell>
                  <Table.Cell>10:00AM</Table.Cell>
                  <Table.Cell>10:00PM</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <CreateReport/>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
// UserProfile.propTypes = {
//   user: PropTypes.shape({
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     userType: PropTypes.string,
//     homeLocation: PropTypes.string,
//     carMake: PropTypes.string,
//     carModel: PropTypes.string,
//     carPlate: PropTypes.string,
//     _id: PropTypes.string,
//   }).isRequired,
// };

// UserProfile.propTypes = {
//   availability: PropTypes.shape({
//     monday: PropTypes.array,
//     tuesday: PropTypes.array,
//     wednesday: PropTypes.array,
//     thursday: PropTypes.array,
//     friday: PropTypes.array,
//     _id: PropTypes.array,
//   }).isRequired,
// };

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserProfile);
