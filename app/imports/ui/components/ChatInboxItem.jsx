import React from 'react';
import { List, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ChatInboxItem extends React.Component {
  render() {
    return (
      <List.Item href='#messages'>
        <Image src={this.props.contact.image1} size='tiny' />
        <List.Content>{this.props.contact.userName2}</List.Content>
      </List.Item>
    );
  }
}

// Require a document to be passed to this component.
ChatInboxItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ChatInboxItem);
