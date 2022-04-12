import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Button, Icon, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#024731' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item>
          <Image src='/images/LogoTransparent.png' className='tiny'/>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>Warrior Ride Buddies</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/main" key='home'>Home</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/info-page" key='info'>Project Info</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="messages" key="messages">Messages</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="profile" key="profile">User Profile</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Button id='login-dropdown-sign-in' as={NavLink} exact to={'/signin'}>
              Log In
            </Button>
          ) : (
            <Menu.Item>
              <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right">
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-sign-out" icon={'pencil alternate'} text="Edit Profile" as={NavLink} exact to="/EditStuff"/>
                  <Dropdown.Item id="navbar-sign-out" icon={'sign out'} text='Sign Out' pointing="top right" as={NavLink} exact to={'/signout'}/>
                </Dropdown.Menu>
              </Dropdown>
              <Icon.Group size='large'>
                <Icon size='big' name='circle outline' />
                <Icon size="small" name='user'/>
              </Icon.Group>
            </Menu.Item>
          )}
        </Menu.Item>
        <Menu.Item>
          {this.props.currentUser === '' ? (
            <Menu.Item>
              <Button id='login-dropdown-sign-up' as={NavLink} exact to={'/signup'}>
                Sign up
              </Button>
            </Menu.Item>
          ) : (
            <Menu.Item/>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
