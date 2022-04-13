import React, { Component } from 'react';
import { Button, Dimmer, Image } from 'semantic-ui-react';

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
        src='./images/kobey.jpeg'
      />
    );
  }
}

export default EditProfileImage;
