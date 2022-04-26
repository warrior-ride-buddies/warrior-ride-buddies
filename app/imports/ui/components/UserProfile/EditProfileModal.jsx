import React from 'react';
import { Button, Dropdown, Icon, Modal } from 'semantic-ui-react';
import EditProfile from '../../pages/UserProfile/EditProfile';
import EditProfileImage from './EditProfileImage';

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Dropdown.Item>
          <Icon name='pencil alternate'/>
          Edit Profile
        </Dropdown.Item>}
    >
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Content>
        <div className='edit-profile-image'>
          <EditProfileImage/>
        </div>
        <EditProfile/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Done Editing
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ModalExampleModal;
