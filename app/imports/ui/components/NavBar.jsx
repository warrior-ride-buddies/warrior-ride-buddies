import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Header, Button, Form, Message, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import LoginDropdown from './UserAuthentication/LoginDropdown';
import EditProfileModal from './UserProfile/EditProfileModal';
import { Users } from '../../api/user/User';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.submit();
    } else if (e.key === 'Tab') {
      e.stopPropagation();
    }
  }

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
    const menuStyle = { backgroundColor: '#024731' };

    // const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.props.location.state) {
      return (
        <div>
          <Menu style={menuStyle} attached="top" borderless secondary inverted stackable>
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header inverted as='h1'>Warrior Ride Buddies</Header>
            </Menu.Item>
            {this.props.currentUser ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/main" key='home' id={'home'}>Home</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="messages" key="messages" id={'inbox'}>Messages</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/profiles" key="profiles" id={'profiles'}>View Profiles</Menu.Item>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin' id={'admin'}>Admin</Menu.Item>
            ) : ''}
            <Menu.Item position="right">
              {this.props.currentUser === '' ? (
                <Button>
                  <Dropdown id="login-dropdown" text="Login" pointing="top right">
                    <Dropdown.Menu onClick={e => e.stopPropagation()}>
                      <LoginDropdown/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Button>
              ) : (
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
                    <Dropdown.Menu>
                      <Dropdown.Item id={'navbar-profile'} icon="user" text="View Profile" as={NavLink} exact to={`/profile/${this.props.currentUser}`}/>
                      <EditProfileModal/>
                      <Dropdown.Item id="navbar-sign-out" icon="sign out" text='Sign Out' pointing="top right" as={NavLink} exact to={'/signout'}/>
                    </Dropdown.Menu>
                  </Dropdown>
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
        </div>
      );
    }

    return (
      <Menu style={menuStyle} attached="top" borderless secondary inverted stackable>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1' textAlign='center'>
            <Image src='/images/LogoTransparent.png' verticalAlign='middle'/>
            <Header.Content>Warrior Ride Buddies</Header.Content>
          </Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/main" key='home' id={'home'}>Home</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/inbox" key='list' id={'inbox'}>Inbox</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/profiles" key="profiles" id={'profiles'}>View Profiles</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin' id={'admin'}>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Button>
              <Dropdown id="login-dropdown" text="Login" pointing="top right">
                <Dropdown.Menu onClick={e => e.stopPropagation()}>
                  <Dropdown.Item>
                    <Form onSubmit={this.submit} onKeyDown={this._handleKeyDown}>
                      <Form.Input
                        label="Email"
                        id="signin-form-email"
                        icon="user"
                        iconPosition="left"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                      />
                      <Form.Input
                        label="Password"
                        id="signin-form-password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                      />
                      <a id="signin-form-submit" content="submit" className="ui button" onClick={this.submit}>Submit</a>
                    </Form>
                    {this.state.error === '' ? (
                      ''
                    ) : (
                      <Message
                        error
                        header="Login was not successful"
                        content={this.state.error}
                      />
                    )}
                    <Message>
                      <Link to="/signup">Click here to Register</Link>
                    </Message>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Button>
          ) : (
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
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-profile" icon="user" text="View Profile" as={NavLink} exact to={`/profile/${this.props.currentUser}`}/>
                  <EditProfileModal/>
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text='Sign Out' pointing="top right" as={NavLink} exact to={'/signout'}/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          )}
        </Menu.Item>
        <Menu.Item>
          {this.props.currentUser === '' ? (
            <Menu.Item>
              <Button id='signup' as={NavLink} exact to={'/signup'}>
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
  currentUserImage: PropTypes.string,
  location: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => (
  {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentUserImage: (Meteor.subscribe(Users.userPublicationName).ready()
        && Meteor.user())
        && Users.collection.find({ owner: Meteor.user().username }).fetch().length >= 1 ? Users.collection.find({ owner: Meteor.user().username }).fetch()[0].image : './images/MissingProfileImage.png',
  }
))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
