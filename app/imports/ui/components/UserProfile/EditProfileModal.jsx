import React from 'react';
import { Button, Dropdown, Icon, Modal } from 'semantic-ui-react';
import EditProfile from '../../pages/UserProfile/EditProfile';

function ModalExampleModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Dropdown.Item id="edit-profile">
          <Icon name='pencil alternate'/>
          Edit Profile
        </Dropdown.Item>}
    >
      <Modal.Header>Edit Profile</Modal.Header>
      <Modal.Content>
        <EditProfile/>
      </Modal.Content>
    </Modal>
  );
}

export default ModalExampleModal;
