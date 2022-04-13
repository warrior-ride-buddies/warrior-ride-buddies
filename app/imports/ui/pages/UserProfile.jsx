import React from 'react';
import { Grid, GridColumn, Header, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
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
                <Header as='h1'>{this.props.user.firstName} {this.props.user.lastName}</Header>
                <p>{this.props.user.userType}<br/>{this.props.user.homeLocation}</p>
              </GridColumn>
              <GridColumn width={8} textAlign='right'>
                <Header as='h3'>Car Details</Header>
                <p>Car Make: {this.props.user.carMake}<br/>Car Model: {this.props.user.carModel}<br/>Car Color: {this.props.user.carColor}<br/>Car License Plate: {this.props.user.carPlate}</p>
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
                  <Table.Cell>{this.props.availability.monday[0]}</Table.Cell>
                  <Table.Cell>{this.props.availability.monday[1]}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Tuesday</Table.Cell>
                  <Table.Cell>{this.props.availability.tuesday[0]}</Table.Cell>
                  <Table.Cell>{this.props.availability.tuesday[1]}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Wednesday</Table.Cell>
                  <Table.Cell>{this.props.availability.wednesday[0]}</Table.Cell>
                  <Table.Cell>{this.props.availability.wednesday[1]}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Thursday</Table.Cell>
                  <Table.Cell>{this.props.availability.thursday[0]}</Table.Cell>
                  <Table.Cell>{this.props.availability.thursday[1]}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Friday</Table.Cell>
                  <Table.Cell>{this.props.availability.friday[0]}</Table.Cell>
                  <Table.Cell>{this.props.availability.friday[1]}</Table.Cell>
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
UserProfile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userType: PropTypes.string,
    homeLocation: PropTypes.string,
    carMake: PropTypes.string,
    carModel: PropTypes.string,
    carColor: PropTypes.string,
    carPlate: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

UserProfile.propTypes = {
  availability: PropTypes.shape({
    monday: PropTypes.array,
    tuesday: PropTypes.array,
    wednesday: PropTypes.array,
    thursday: PropTypes.array,
    friday: PropTypes.array,
    _id: PropTypes.array,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserProfile);
