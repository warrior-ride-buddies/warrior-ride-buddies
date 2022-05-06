import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Container, Modal, ModalHeader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Users } from '../../../api/user/User';
import AddTripForm from './AddTripForm';

/** This component is a Modal that will display ConversationContent
 *  Appears as a blue message button
 *  Meant to be used on MapPins and Profiles */
class AddTrip extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false, // Hides or shows the Conversation
    };
  }

  onClose = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  onOpen = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: true,
      });
    }

  };

  render() {
    return (this.props.ready) ? this.renderPage() : <Modal
      size='mini'
      onClose={this.onClose}
      onOpen={this.onOpen}
      open={this.isOpen}
      trigger={<Button color='green' content='Add a trip' icon='send' labelPosition='left'/>}
    />;
  }

  renderPage() {
    const currentUser = this.props.currentUser;
    // const users = this.props.users.filter((user) => (conversation.users.some((cUser) => (cUser === user.owner))));
    return (
      <Modal
        size='mini'
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={this.isOpen}
        trigger={<Button id="add-trip" color='green' content='Add a trip' icon='send' labelPosition='right'/>}
      >
        <ModalHeader>Add a Trip</ModalHeader>
        <Container>
          <AddTripForm user={currentUser}/>
        </Container>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
AddTrip.propTypes = {
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const ready = subscription.ready();
  const users = Users.collection.find({}).fetch();
  return {
    users,
    ready,
  };
})(AddTrip);
