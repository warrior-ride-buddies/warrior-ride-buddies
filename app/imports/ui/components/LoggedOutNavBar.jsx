import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Header, Button, Form, Message, Image } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class LoggedOutNavBar extends React.Component {
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
    // const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    const menuStyle = { backgroundColor: '#024731' };
    return (
      <Menu style={menuStyle} attached="top" borderless secondary inverted stackable>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1' textAlign='center'>
            <Image src='/images/LogoTransparent.png' verticalAlign='middle'/>
            <Header.Content>Warrior Ride Buddies</Header.Content>
          </Header>
        </Menu.Item>
        <Menu.Item position="right">
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
          <Menu.Item>
            <Button id='signup' as={NavLink} exact to={'/signup'}>
              Sign up
            </Button>
          </Menu.Item>
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
LoggedOutNavBar.propTypes = {
  location: PropTypes.object.isRequired,
};

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(LoggedOutNavBar);
