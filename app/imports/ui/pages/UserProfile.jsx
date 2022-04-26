import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Grid, Header, Image, Loader, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/User';
import UserInfo from '../components/UserInfo';
import Schedule from '../components/Schedule';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const user = this.props.user[0];
    return (
      <Grid style={{ margin: '20px' }} id={'userprofile-page'}>
        <Grid.Column width={4} textAlign='center'>
          <div style={{ height: '750px', backgroundColor: 'grey', borderRadius: '20px' }}>
            <Image src='./images/kobey.jpeg' style={{ padding: '30px' }} circular/>
          </div>
        </Grid.Column>
        <Grid.Column width={12}>
          <div style={{ height: '750px', paddingTop: '30px' }}>
            <UserInfo key={user._id} user={user} />
            <Header as='h2' textAlign='center' style={{ paddingTop: '30px' }}>Schedule</Header>
            <Schedule trips={user.trips}/>
            <Button>Message {this.props.user.firstName}</Button>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
UserProfile.propTypes = {

  // availability: PropTypes.shape({
  //   monday: PropTypes.array,
  //   tuesday: PropTypes.array,
  //   wednesday: PropTypes.array,
  //   thursday: PropTypes.array,
  //   friday: PropTypes.array,
  //   _id: PropTypes.array,
  // }).isRequired,

  user: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const email = match.params.owner;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const user = Users.collection.find({ owner: email }).fetch();
  return {
    user,
    ready,
  };
})(UserProfile);
