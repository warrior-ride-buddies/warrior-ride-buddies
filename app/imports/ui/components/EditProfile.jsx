import React from 'react';
import { Button, Form, Grid, Header, Icon, Input, Modal, Table } from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import swal from 'sweetalert';
import EditProfileImage from './EditProfileImage';

function EditProfile() {
  const [firstOpen, setFirstOpen] = React.useState(false);

  return (
    <>
      <Button color='green' onClick={() => setFirstOpen(true)}>Edit Profile</Button>

      <Modal
        closeIcon
        closeOnDimmerClick={false}
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Header>
          Edit Profile
        </Modal.Header>
        <Modal.Content>
          <div className='edit-profile-image'>
            <EditProfileImage/>
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
                    <label>CITY</label>
                    <Input placeholder='City'/>
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
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Tuesday</Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Wednesday</Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Thursday</Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Friday</Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Saturday</Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Sunday</Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field>
                      <input type="time" id="Min datetime" name="Min datetime" className="css-17rlcm6"/>
                    </Form.Field>
                  </Table.Cell>
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
          <Button color='green' onClick={() => { swal('Success', 'Saved Chances Successfully', 'success').then(() => window.location.reload(false)); }}>
            Proceed <Icon name='right chevron'/>
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default (EditProfile);
