import React from 'react';
import { Dropdown, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class LoginDropdown extends React.Component {
  render() {
    return (
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
    );
  }
}

export default LoginDropdown;
