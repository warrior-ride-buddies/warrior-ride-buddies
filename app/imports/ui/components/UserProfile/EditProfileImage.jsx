import React, { Component } from 'react';
import { Button, Dimmer, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class EditProfileImage extends Component {
  state = {}

  handleShow = () => this.setState({ active: true });

  handleHide = () => this.setState({ active: false });

  render() {
    const { active } = this.state;
    const content = (
      <div>
        <Button primary onClick={() => (console.log('do something'))}>Add Photo</Button>
      </div>
    );

    return (
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        size='medium'
        rounded
        src={this.props.user.image}
      />
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfileImage.propTypes = {
  user: PropTypes.object,
};

export default EditProfileImage;
