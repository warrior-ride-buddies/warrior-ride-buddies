import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Container, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import EditProfileModal from './UserProfile/EditProfileModal';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class LoggedInNavBar extends React.Component {
  render() {
    const menuStyle = { backgroundColor: '#024731' };
    return (
      <div>
        <Menu style={menuStyle} attached="top" borderless secondary inverted stackable>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1' textAlign='center'>
              <Image src='/images/LogoTransparent.png' verticalAlign='middle'/>
              <Header.Content>Warrior Ride Buddies</Header.Content>
            </Header>
          </Menu.Item>
          {this.props.currentProfile.length > 0 ?
            <Container>
              <Menu.Item as={NavLink} activeClassName="active" exact to="/main" key='home' id={'home'}>Home</Menu.Item>
              <Menu.Item as={NavLink} activeClassName="active" exact to="/inbox" key="messages" id={'inbox'}>Messages</Menu.Item>
              <Menu.Item as={NavLink} activeClassName="active" exact to="/profiles" key="profiles" id={'profiles'}>View Profiles</Menu.Item>
            </Container> : <Container/>}
          {this.props.currentProfile.length > 0 && Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin' id={'admin'}>Admin</Menu.Item>
          ) : <Container/>}
          <Menu.Item>
            <Dropdown
              id="navbar-current-user"
              text={this.props.currentUser}
              icon={
                <Image
                  avatar
                  style={ { marginLeft: '10px' } } src={this.props.currentUserImage}
                />
              }
              pointing="top right"
            >
              {this.props.currentProfile.length > 0 ?
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-profile" icon="user" text="View Profile" as={NavLink} exact to={`/profile/${this.props.currentUser}`}/>
                  <EditProfileModal/>
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text='Sign Out' pointing="top right" as={NavLink} exact to={'/signout'}/>
                </Dropdown.Menu> :
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-createProfile" icon="user" text="Create Profile" as={NavLink} exact to={'/createProfile/'}/>
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text='Sign Out' pointing="top right" as={NavLink} exact to={'/signout'}/>
                </Dropdown.Menu>
              }
            </Dropdown>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

// Declare the types of all properties.
LoggedInNavBar.propTypes = {
  currentUser: PropTypes.string.isRequired,
  currentProfile: PropTypes.array.isRequired,
  currentUserImage: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(LoggedInNavBar);
