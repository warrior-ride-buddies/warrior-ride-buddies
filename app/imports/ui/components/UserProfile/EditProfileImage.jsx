import React, { Component } from 'react';
import { Dimmer, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ApiKeys from '../../../../ApiKeys.json';

class EditProfileImage extends Component {
  state = {}

  handleShow = () => this.setState({ active: true });

  handleHide = () => this.setState({ active: false });

  render() {
    const { active } = this.state;
    const content = (
      <div>
        <input
          type="hidden"
          role="uploadcare-uploader"
          data-public-key={ApiKeys.uploadcareKey}
          data-tabs="file camera url facebook gdrive gphotos"
          data-effects="crop, rotate"
          name="profilePicture"
        />
      </div>
    );

    return (
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        size='medium'
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
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
