import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { Users } from '../../../api/user/User';
import LoggedOutNavBar from './LoggedOutNavBar';
import LoggedInNavBar from './LoggedInNavBar';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {

  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
        window.location.hash = '#/main';
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    // const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    return (
      <div>
        {this.props.currentUser === '' ?
          <LoggedOutNavBar
            location={this.props.location}
          /> :
          <LoggedInNavBar
            currentUser={this.props.currentUser}
            currentProfile={this.props.currentProfile}
            currentUserImage={this.props.currentUserImage}
            location={this.props.location}
          />}
      </div>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
  currentProfile: PropTypes.array,
  currentUserImage: PropTypes.string,
  location: PropTypes.object,
  ready: PropTypes.bool,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => (
  {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentProfile: (Meteor.subscribe(Users.userPublicationName).ready() && Meteor.user()) && Users.collection.find({ owner: Meteor.user().username }).fetch().length >= 1 ? Users.collection.find({ owner: Meteor.user().username }).fetch() : [],
    currentUserImage: (Meteor.subscribe(Users.userPublicationName).ready()
        && Meteor.user())
    && Users.collection.find({ owner: Meteor.user().username }).fetch().length >= 1 ? Users.collection.find({ owner: Meteor.user().username }).fetch()[0].image : './images/MissingProfileImage.png',
    ready: Meteor.subscribe(Users.userPublicationName).ready(),
  }
))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
