import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Header, Button, Icon, Form, Message, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

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
    const menuStyle = { marginBottom: '10px', backgroundColor: '#024731' };

    // const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.props.location.state) {
      return (
        <div>
          <Menu style={menuStyle} attached="top" borderless inverted>
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
                  <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={null}>
                    <Dropdown.Menu>
                      <Dropdown.Item id="navbar-sign-out" icon="pencil alternate" text="Edit Profile" as={NavLink} exact to="/profile"/>
                      <Dropdown.Item id="navbar-sign-out" icon="sign out" text='Sign Out' pointing="top right" as={NavLink} exact to={'/signout'}/>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Icon.Group size='large'>
                    <Icon size='big' name='circle outline'/>
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
        </div>
      );
    }

    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image src='/images/LogoTransparent.png' className='tiny'/>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>Warrior Ride Buddies</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/main" key='home'>Home</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/info-page" key='info'>Project Info</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/chatinbox" key='list'>Inbox</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="profile" key="profile">User Profile</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
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
              <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={null}>
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-sign-out" icon="pencil alternate" text="Edit Profile" as={NavLink} exact to="/profile"/>
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text='Sign Out' pointing="top right" as={NavLink} exact to={'/signout'}/>
                </Dropdown.Menu>
              </Dropdown>
              <Icon.Group size='large'>
                <Icon size='big' name='circle outline'/>
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
  location: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
