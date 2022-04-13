import React from 'react';
import { Button, Form, Grid, Header, Icon, Input, Modal, Table } from 'semantic-ui-react';
import EditProfileImage from './EditProfileImage';

function EditProfile() {
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  return (
    <>
      <Button color='green' onClick={() => setFirstOpen(true)}>Edit Profile</Button>

      <Modal
        closeOnDimmerClick={false}
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Content>
          {/*remove extra div's here when finished*/}
          <div>
            <div className='edit-profile-image'>
              <EditProfileImage/>
            </div>
          </div>
        </Modal.Content>
        <Modal.Content>
          <Grid container>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form>
                  <Form.Field required>
                    <label>NAME</label>
                    <Input placeholder='Name'/>
                  </Form.Field>
                  <Form.Field required>
                    <label>ADDRESS</label>
                    <Input placeholder='Address'/>
                  </Form.Field>
                  <Form.Field required>
                    <label>ZIPCODE</label>
                    <Input placeholder='Zipcode'/>
                  </Form.Field>
                  <Form.Field required>
                    <label>AVAILABILITY</label>
                    <Input placeholder='Availablity dropdown boxes'/>
                  </Form.Field>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <Form>
                  <Form.Field>
                    <label>CAR MAKE</label>
                    <Input placeholder='Car Make i.e. Toyota'/>
                  </Form.Field>
                  <Form.Field>
                    <label>CAR MODEL</label>
                    <Input placeholder='Car Model i.e Corolla'/>
                  </Form.Field>
                  <Form.Field>
                    <label>CAR COLOR</label>
                    <Input placeholder='Car Color'/>
                  </Form.Field>
                  <Form.Field>
                    <label>CAR LICENSE PLATE</label>
                    <Input placeholder='Car License Plate'/>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header textAlign='center' as={'h1'}>Availability</Header>
          <Grid container>
            <Table singleLine>
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
                  <Table.Cell>
                    <Form.Field control='select'>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </Form.Field>
                  </Table.Cell>
                  <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Tuesday</Table.Cell>
                  <Table.Cell>January 11, 2014</Table.Cell>
                  <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Wednesday</Table.Cell>
                  <Table.Cell>May 11, 2014</Table.Cell>
                  <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Thursday</Table.Cell>
                  <Table.Cell>May 11, 2014</Table.Cell>
                  <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Friday</Table.Cell>
                  <Table.Cell>May 11, 2014</Table.Cell>
                  <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Saturday</Table.Cell>
                  <Table.Cell>May 11, 2014</Table.Cell>
                  <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Sunday</Table.Cell>
                  <Table.Cell>May 11, 2014</Table.Cell>
                  <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => setFirstOpen(false)}>
            <Icon name={'times'}/>
            Cancel
          </Button>
          <Button color='green' onClick={() => setSecondOpen(true)}>
            Proceed <Icon name='right chevron'/>
          </Button>
        </Modal.Actions>

        <Modal
          closeOnDimmerClick={false}
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='small'
        >
          <Modal.Header>Modal #2</Modal.Header>
          <Modal.Content>
            <p>That's everything!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon='check'
              content='All Done'
              onClick={() => setSecondOpen(false)}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
  );
}

export default (EditProfile);
